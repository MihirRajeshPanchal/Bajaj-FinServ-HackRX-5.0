from io import BytesIO
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from backend.constants import APP_NAME
from backend.auth import load_credentials
from backend.models import SlidesRequest
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
        new_presentation_name = slides_request.name

        duplicated_presentation = copy_presentation(
            drive_service,
            original_presentation_id,
            new_presentation_name
        )
        duplicated_presentation_id = duplicated_presentation.get('id')

        if not duplicated_presentation_id:
            raise HTTPException(status_code=500, detail="Failed to duplicate presentation.")

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000, debug=True)