from io import BytesIO
import json
import re
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import ValidationError
from backend.constants import APP_NAME
from backend.auth import load_credentials
from backend.models import QuizRequest, RagRequest, SlideRequest, SlidesRequest, Slide
from backend.rag import get_pdf_text_from_bytes, get_text_chunks, get_vector_store, user_input
from backend.slides import build_slide, slides_init
from backend.utils import copy_presentation, drive_init, export_presentation
import os

app = FastAPI()
os.makedirs('compute', exist_ok=True)

@app.get("/")
async def app_init():
    return {"response": f"{APP_NAME} Backend Running"}

@app.get("/auth")
async def auth():
    try:
        load_credentials()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"response": "Authorization Successful"}

@app.post("/slides")
async def create_slides(slides_request: SlidesRequest):
    try:
        creds = load_credentials()
        slides_service = slides_init(creds)
        drive_service = drive_init(creds)
        original_presentation_id = slides_request.presentation_id
        new_presentation_name = slides_request.file_path

        duplicated_presentation = copy_presentation(
            drive_service,
            original_presentation_id,
            new_presentation_name
        )
        duplicated_presentation_id = duplicated_presentation.get('id')

        if not duplicated_presentation_id:
            raise HTTPException(status_code=500, detail="Failed to duplicate presentation.")
        
        with open(f"compute/{slides_request.file_path}.json", 'r') as file:
            data = json.load(file)

        slides_data = data["text"]["slides"]
        slides_list = []
        for slide_data in slides_data:
            try:
                slide = Slide(**slide_data) 
                slides_list.append(slide)
            except ValidationError as e:
                raise HTTPException(status_code=400, detail=f"Invalid slide data: {e}")

        slides_request = slides_request.copy(update={"name": slides_request.file_path})
        slides_request = slides_request.copy(update={"slides": slides_list})
        
        for slide_request in slides_request.slides:
            build_slide(slides_service, duplicated_presentation_id, slide_request)

        export_format = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        presentation_file = export_presentation(
            drive_service,
            duplicated_presentation_id,
            export_format
        )

        if not isinstance(presentation_file, BytesIO):
            raise HTTPException(status_code=500, detail="Failed to export presentation.")
        
        file_path = f'compute/{new_presentation_name}.pptx'
        with open(file_path, 'wb') as f:
            f.write(presentation_file.getvalue())

        return StreamingResponse(
            open(file_path, 'rb'),
            media_type=export_format,
            headers={"Content-Disposition": f"attachment; filename={new_presentation_name}.pptx"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/rag_embed")
async def rag_embed(rag_request: RagRequest):
    try:
        pdf_directory = 'compute/'
        os.makedirs(pdf_directory, exist_ok=True)
        
        file_path = os.path.join(pdf_directory, rag_request.file_path)
        
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found")

        with open(file_path, 'rb') as pdf_file:
            pdf_bytes = pdf_file.read()
        
        pdf_text = get_pdf_text_from_bytes(pdf_bytes)

        text_chunks = get_text_chunks(pdf_text)

        vector_store_dir = f'{pdf_directory}{os.path.splitext(rag_request.file_path)[0]}_'
        
        get_vector_store(text_chunks, filepath=vector_store_dir)
        return {"response": "Embedding Successful"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/quiz_generate")
async def quiz_generate(quiz_request: QuizRequest):
    try:
        prompt = '''
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
        '''.format(quiz_request.no_of_questions)
        answer = user_input(prompt, filepath=f'compute/{quiz_request.file_path}')
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/slide_generate")
async def slide_generate(slide_request: SlideRequest):
    try:
        prompt = '''
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
        '''

        answer = user_input(prompt, filepath=f'compute/{slide_request.file_path}')
        for index, slide in enumerate(answer["text"]["slides"], start=1):
            slide["slide_number"] = index
        json_string = json.dumps(answer, indent=4)
           
        file_name = f"compute/{slide_request.file_path}.json"
        with open(file_name, "w") as file:
            file.write(json_string)
        return answer
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
if __name__ == "__main__":
    
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000, debug=True)