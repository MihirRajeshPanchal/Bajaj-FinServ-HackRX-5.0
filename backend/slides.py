from googleapiclient.discovery import build
from backend.models import SlideCreationRequest
from backend.utils import add_custom_text_to_slide, add_image_to_slide, add_bullet_text_to_slide, delete_all_elements_on_slide

def build_slide(service, presentation_id, slide_request: SlideCreationRequest):
    if slide_request.text:
        add_custom_text_to_slide(
            service, 
            presentation_id, 
            slide_request.slide_number, 
            slide_request.text, 
            slide_request.x, 
            slide_request.y, 
            slide_request.bold, 
            slide_request.underline, 
            slide_request.fontsize
        )
    if slide_request.bullet:
        add_bullet_text_to_slide(
            service, 
            presentation_id, 
            slide_request.slide_number, 
            slide_request.bullet, 
            slide_request.x, 
            slide_request.y, 
            slide_request.fontsize
        )
    if slide_request.image_url:
        add_image_to_slide(
            service, 
            presentation_id, 
            slide_request.slide_number, 
            slide_request.image_url, 
            slide_request.x, 
            slide_request.y,
            slide_request.scaleX,
            slide_request.scaleY
        )

def slides_init(creds):
    service = build("slides", "v1", credentials=creds)
    return service