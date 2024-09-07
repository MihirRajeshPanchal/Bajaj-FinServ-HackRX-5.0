from io import BytesIO
import json
import re
import requests
from typing import Any, Dict
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import ValidationError
from backend.aws import (
    BajajBucket,
    download_from_s3,
    download_s3_folder,
    dump_quiz_response_to_dynamodb,
    dump_quiz_to_dynamodb,
    dump_slide_to_dynamodb,
    dump_summary_to_dynamodb,
    get_s3_folder_structure,
    store_email_in_dynamodb,
    quiztable,
    summarytable,
    slidetable,
    upload_folder_to_s3,
    upload_pdf_to_s3,
    upload_to_s3,
)
from backend.constants import APP_NAME
from backend.auth import get_user_info, load_credentials
from backend.models import (
    FrontendJson,
    QuizRequest,
    QuizResponse,
    RagRequest,
    SlideRequest,
    SlidesRequest,
    Slide,
    SummaryRequest,
)
from backend.rag import (
    get_pdf_text_from_bytes,
    get_text_chunks,
    get_vector_store,
    user_input,
)
from backend.slides import build_slide, slides_init
from backend.utils import copy_presentation, drive_init, export_presentation
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
os.makedirs("compute", exist_ok=True)
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def app_init():
    return {"response": f"{APP_NAME} Backend Running"}


@app.get("/auth")
async def auth():
    try:
        creds = load_credentials()
        user_info = get_user_info(creds)
        email = user_info.get("email")
        store_email_in_dynamodb(email)
        return {"response": "Authorization Successful", "email": email}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/slides")
async def create_slides(slide_request: SlidesRequest):
    try:
        creds = load_credentials()
        slides_service = slides_init(creds)
        drive_service = drive_init(creds)
        original_presentation_id = slide_request.presentation_id
        new_presentation_name = (
            slide_request.topic
            + " "
            + slide_request.plan
            + " "
            + slide_request.document
        )

        s3_file_path = f"{slide_request.topic}/{slide_request.plan}/{slide_request.document}/{new_presentation_name}.pptx"
        try:
            presentation_file = download_from_s3(BajajBucket, s3_file_path)
            return StreamingResponse(
                presentation_file,
                media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
                headers={
                    "Content-Disposition": f"attachment; filename={new_presentation_name}.pptx"
                },
            )
        except Exception as e:
            duplicated_presentation = copy_presentation(
                drive_service, original_presentation_id, new_presentation_name
            )
            duplicated_presentation_id = duplicated_presentation.get("id")

            if not duplicated_presentation_id:
                raise HTTPException(
                    status_code=500, detail="Failed to duplicate presentation."
                )

            response = slidetable.get_item(
                Key={"plan": str(slide_request.plan + " " + slide_request.document)}
            )

            if "Item" in response:
                data = json.loads(response["Item"]["json_data"])
            else:
                data = await generate_slide_data(
                    slide_request.topic, slide_request.plan, slide_request.document
                )
                dump_slide_to_dynamodb(
                    str(slide_request.plan + " " + slide_request.document), data
                )

            slides_data = data["text"]["slides"]
            slides_list = []
            for slide_data in slides_data:
                try:
                    slide = Slide(**slide_data)
                    slides_list.append(slide)
                except ValidationError as e:
                    raise HTTPException(
                        status_code=400, detail=f"Invalid slide data: {e}"
                    )

            slide_request = slide_request.copy(update={"name": slide_request.plan})
            slide_request = slide_request.copy(update={"slides": slides_list})

            for slide_request in slide_request.slides:
                build_slide(slides_service, duplicated_presentation_id, slide_request)

            export_format = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            presentation_file = export_presentation(
                drive_service, duplicated_presentation_id, export_format
            )

            if not isinstance(presentation_file, BytesIO):
                raise HTTPException(
                    status_code=500,
                    detail="Failed to export presentation. The returned file is not a BytesIO object.",
                )

            with open("compute/" + s3_file_path, "wb") as f:
                f.write(presentation_file.getvalue())
            s3_buffer = BytesIO(presentation_file.getvalue())
            upload_to_s3(s3_buffer, BajajBucket, s3_file_path)
            return StreamingResponse(
                open("compute/" + s3_file_path, "rb"),
                media_type=export_format,
                headers={
                    "Content-Disposition": f"attachment; filename={new_presentation_name}.pptx"
                },
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/rag_embed")
async def rag_embed(rag_request: RagRequest):
    try:
        compute_directory = "compute/"
        pdf_directory = "pdfs/"
        os.makedirs(compute_directory, exist_ok=True)
        os.makedirs(pdf_directory, exist_ok=True)

        local_embedding_path = os.path.join(
            compute_directory,
            f"{rag_request.topic}/{os.path.splitext(rag_request.plan)[0]}/{rag_request.document}/faiss_index/index.faiss",
        )

        if os.path.exists(local_embedding_path):
            return {"response": "Embedding already exists locally"}

        s3_prefix = f"{rag_request.topic}/{os.path.splitext(rag_request.plan)[0]}/{rag_request.document}/faiss_index"
        try:
            local_s3_folder_path = os.path.join(
                compute_directory,
                f"{rag_request.topic}/{os.path.splitext(rag_request.plan)[0]}/{rag_request.document}/faiss_index",
            )
            os.makedirs(local_s3_folder_path, exist_ok=True)
            download_s3_folder(BajajBucket, s3_prefix, local_s3_folder_path)
            return {"response": "Embedding downloaded from S3"}
        except FileNotFoundError:
            file_path = os.path.join(
                pdf_directory, os.path.basename(rag_request.pdf_link)
            )

            response = requests.get(rag_request.pdf_link)
            if response.status_code == 200:
                with open(file_path, "wb") as pdf_file:
                    pdf_file.write(response.content)
            else:
                raise HTTPException(status_code=404, detail="Failed to download PDF")

            pdf_s3_path = f"{rag_request.topic}/{os.path.splitext(rag_request.plan)[0]}/{rag_request.document}/{os.path.basename(file_path)}"
            upload_pdf_to_s3(file_path, BajajBucket, pdf_s3_path)
            with open(file_path, "rb") as pdf_file:
                pdf_bytes = pdf_file.read()

            pdf_text = get_pdf_text_from_bytes(pdf_bytes)
            text_chunks = get_text_chunks(pdf_text)
            vector_store_dir = f"{compute_directory}{rag_request.topic}/{os.path.splitext(rag_request.plan)[0]}/{rag_request.document}/faiss_index"

            get_vector_store(text_chunks, filepath=vector_store_dir)
            upload_folder_to_s3(vector_store_dir, BajajBucket, s3_prefix)

            return {"response": "Embedding created and uploaded to S3"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/quiz_generate")
async def quiz_generate(quiz_request: QuizRequest):
    try:
        response = quiztable.get_item(
            Key={"plan": str(quiz_request.plan + " " + quiz_request.document)}
        )

        if "Item" in response:
            return json.loads(response["Item"]["json_data"])
        prompt = """
        Please provide a JSON with {} generated questions and answers in the following schema:

        {{
        "questions": [
            {{
            "questionText": "Question text goes here",
            "questionOptions": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "questionAnswerIndex": 0,
            }},
            {{
            "questionText": "Question text goes here",
            "questionOptions": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "questionAnswerIndex": 1,
            }},
            // Add more questions as needed
        ]
        }}

        Ensure the provided JSON adheres to the defined schema.
        """.format(
            quiz_request.no_of_questions
        )
        answer = user_input(
            prompt,
            filepath=f"compute/{quiz_request.topic}/{os.path.splitext(quiz_request.plan)[0]}/{quiz_request.document}/faiss_index",
        )
        dump_quiz_to_dynamodb(
            str(quiz_request.plan + " " + quiz_request.document), answer
        )
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def generate_slide_data(topic: str, plan: str, document: str) -> Dict[str, Any]:
    """
    Function to generate slide data based on file path.
    """
    prompt = """
    Please provide a JSON with 5 slides in the following schema. Each slide should include detailed voiceover text as one would present in a PowerPoint presentation and bullet points formatted for a presentation.
    {{
    "slides": [
        {{
            "slide_main_title": "Title for slide 1",
            "slide_main_subtitle": "Subtitle for slide 1",
            "slide_voiceover": "Detailed voiceover explanation for slide 1, presented as a transcript for a PowerPoint presentation. This should cover an overview of the presentation and engage the audience with detailed explanations."
        }},
        {{
            "slide_title": "Title for slide 2",
            "bullet_points": [
                "Bullet point 1 formatted for presentation",
                "Bullet point 2 formatted for presentation",
                "Bullet point 3 formatted for presentation",
                "Bullet point 4 formatted for presentation"
            ],
            "slide_voiceover": "Detailed voiceover explanation for slide 2, presented as a transcript for a PowerPoint presentation. This should elaborate on each bullet point and provide a comprehensive explanation."
        }},
        {{
            "slide_title": "Title for slide 3",
            "bullet_points": [
                "Bullet point 1 formatted for presentation",
                "Bullet point 2 with figures formatted for presentation",
                "Bullet point 3 formatted for presentation",
                "Bullet point 4 formatted for presentation"
            ],
            "slide_voiceover": "Detailed voiceover explanation for slide 3, presented as a transcript for a PowerPoint presentation. This should provide a thorough explanation of the bullet points, including any relevant figures or data."
        }},
        {{
            "slide_title": "Title for slide 4",
            "bullet_points": [
                "Bullet point 1 formatted for presentation",
                "Bullet point 2 with figures formatted for presentation",
                "Bullet point 3 formatted for presentation",
                "Bullet point 4 formatted for presentation"
            ],
            "slide_voiceover": "Detailed voiceover explanation for slide 4, presented as a transcript for a PowerPoint presentation. This should offer a clear explanation of the final bullet points and summarize the key takeaways."
        }},
        {{
            "slide_disclaimer": "Disclaimer for the last slide",
            "slide_ending_note": "Ending note remarks for the last slide",
            "slide_voiceover": "Detailed voiceover explanation for the last slide, presented as a transcript for a PowerPoint presentation. This should provide concluding remarks and emphasize the importance of the disclaimer and ending notes."
        }}
    ]
    }}

    Ensure the provided JSON adheres to the defined schema and includes detailed voiceover text and bullet points suitable for a PowerPoint presentation.
    """

    answer = user_input(
        prompt, filepath=f"compute/{topic}/{plan}/{document}/faiss_index"
    )
    for index, slide in enumerate(answer["text"]["slides"], start=1):
        slide["slide_number"] = index
    return answer


@app.post("/slide_generate")
async def slide_generate(slide_request: SlideRequest):
    try:
        response = slidetable.get_item(
            Key={"plan": str(slide_request.plan + " " + slide_request.document)}
        )

        if "Item" in response:
            return json.loads(response["Item"]["json_data"])

        answer = await generate_slide_data(
            slide_request.topic, slide_request.plan, slide_request.document
        )

        dump_slide_to_dynamodb(
            str(slide_request.plan + " " + slide_request.document), answer
        )
        return answer
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def generate_summary_data(topic: str, plan: str, document: str) -> Dict[str, Any]:
    """
    Function to generate summary data based on file path.
    """
    prompt = f"""
    Please analyze the document and generate a JSON summary with the following format:

    {{
        "summary": "Provide a clear and concise summary of the document here. The summary should be engaging and suitable for someone who has not read the document. It should include key points and essential information from the document."
    }}

    Ensure the JSON is valid and properly formatted. The output should be a single JSON object with a "summary" field containing the text summary of the document.
    """

    answer = user_input(
        prompt, filepath=f"compute/{topic}/{plan}/{document}/faiss_index"
    )
    return answer

@app.post("/summary_generate")
async def summary_generate(summary_request: SummaryRequest):
    try:
        response = summarytable.get_item(
            Key={"plan": str(summary_request.plan + " " + summary_request.document)}
        )

        if "Item" in response:
            return json.loads(response["Item"]["json_data"])

        answer = await generate_summary_data(
            summary_request.topic, summary_request.plan, summary_request.document
        )

        dump_summary_to_dynamodb(
            str(summary_request.plan + " " + summary_request.document), answer
        )
        return answer
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/quiz_response")
async def quiz_response(quiz_response_model: QuizResponse):
    try:
        dump_quiz_response_to_dynamodb(
            quiz_response_model.email,
            quiz_response_model.topic,
            quiz_response_model.plan,
            quiz_response_model.document,
            quiz_response_model.noCorrectResponse,
            quiz_response_model.noWrongResponse,
        )
        return {"response": "Data uploaded to DynamoDB"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/frontend_sidebar_json")
async def frontend_sidebar_json():
    try:
        return get_s3_folder_structure(BajajBucket)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/frontend_json")
async def frontend_json(frontend_model: FrontendJson):
    resdict={}
    try:
        response = slidetable.get_item(
        Key={"plan": str(frontend_model.plan + " " + frontend_model.document)}
        )
        if "Item" in response:
            resdict["slides"] = json.loads(response["Item"]["json_data"])
        
        response = quiztable.get_item(
            Key={"plan": str(frontend_model.plan + " " + frontend_model.document)}
        )

        if "Item" in response:
            resdict["quiz"] = json.loads(response["Item"]["json_data"])
            
        response = summarytable.get_item(
            Key={"plan": str(frontend_model.plan + " " + frontend_model.document)}
        )

        if "Item" in response:
            resdict["summary"] = json.loads(response["Item"]["json_data"])
            
        return resdict
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=5000, debug=True)
