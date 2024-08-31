from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from backend.constants import APP_NAME
from backend.auth import load_credentials
from backend.models import SlidesRequest
from backend.slides import build_slide, slides_init
from backend.utils import drive_init, export_presentation, delete_all_elements_on_slide
app = FastAPI()

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
        service = slides_init(creds)
        drive_service = drive_init(creds)
        presentation_id = slides_request.presentation_id
        
        for slide_request in slides_request.slides:
            delete_all_elements_on_slide(service, presentation_id, slide_request.slide_number)
            
        for slide_request in slides_request.slides:
            build_slide(service, presentation_id, slide_request)
            
        export_format = 'application/pdf'
        presentation_file = export_presentation(drive_service, presentation_id, export_format)
        
        return StreamingResponse(
            presentation_file,
            media_type=export_format,
            headers={"Content-Disposition": f"attachment; filename=slides.{export_format.split('/')[1]}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000, debug=True)