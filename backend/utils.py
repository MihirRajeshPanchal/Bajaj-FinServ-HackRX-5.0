import random
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
import io

used_suffixes = set()

def generate_unique_suffix():
    """Generate a unique random number suffix for object IDs."""
    while True:
        suffix = str(random.randint(1000, 9999))
        if suffix not in used_suffixes:
            used_suffixes.add(suffix)
            return suffix

def get_slide_id_by_number(service, presentation_id, slide_number):
    """Retrieve the slide ID for a given slide number."""
    presentation = service.presentations().get(presentationId=presentation_id).execute()
    slides = presentation.get("slides", [])
    
    if 1 <= slide_number <= len(slides):
        slide = slides[slide_number - 1]
        return slide.get("objectId")
    else:
        raise ValueError(f"Slide number {slide_number} is out of range.")

def add_custom_text_to_slide(service, presentation_id, slide_number, text, x, y, bold=False, underline=False, fontsize=18):
    """Add a customized text box to a specified slide."""
    slide_id = get_slide_id_by_number(service, presentation_id, slide_number)
    suffix = generate_unique_suffix()
    object_id = f"TextBox_{slide_number}_{suffix}"  
    text_style = {
        "bold": bold,
        "underline": underline,
        "fontSize": {
            "magnitude": fontsize,
            "unit": "PT"
        }
    }
    
    requests = [
        {
            "createShape": {
                "objectId": object_id,
                "shapeType": "TEXT_BOX",
                "elementProperties": {
                    "pageObjectId": slide_id,  
                    "size": {
                        "height": {"magnitude": 1000000, "unit": "EMU"},
                        "width": {"magnitude": 5000000, "unit": "EMU"},
                    },
                    "transform": {
                        "scaleX": 1,
                        "scaleY": 1,
                        "translateX": x,
                        "translateY": y,
                        "unit": "EMU"
                    }
                }
            }
        },
        {
            "insertText": {
                "objectId": object_id,
                "text": text
            }
        },
        {
            "updateTextStyle": {
                "objectId": object_id,
                "style": text_style,
                "fields": "bold,underline,fontSize"
            }
        }
    ]
    
    service.presentations().batchUpdate(
        presentationId=presentation_id,
        body={"requests": requests}
    ).execute()

def add_bullet_text_to_slide(service, presentation_id, slide_number, text, x, y, fontsize=18):
    """Add a text box with bullet points to a specified slide."""
    slide_id = get_slide_id_by_number(service, presentation_id, slide_number)
    suffix = generate_unique_suffix()
    object_id = f"BulletTextBox_{slide_number}_{suffix}"  
    
    requests = [
        {
            "createShape": {
                "objectId": object_id,
                "shapeType": "TEXT_BOX",
                "elementProperties": {
                    "pageObjectId": slide_id,  
                    "size": {
                        "height": {"magnitude": 1000000, "unit": "EMU"},
                        "width": {"magnitude": 5000000, "unit": "EMU"},
                    },
                    "transform": {
                        "scaleX": 1,
                        "scaleY": 1,
                        "translateX": x,
                        "translateY": y,
                        "unit": "EMU"
                    }
                }
            }
        },
        {
            "insertText": {
                "objectId": object_id,
                "text": text
            }
        },
        {
            "updateTextStyle": {
                "objectId": object_id,
                "style": {
                    "fontSize": {
                        "magnitude": fontsize,
                        "unit": "PT"
                    }
                },
                "fields": "fontSize"
            }
        },

    ]
    
    response = service.presentations().batchUpdate(
        presentationId=presentation_id,
        body={"requests": requests}
    ).execute()
    return response

def add_image_to_slide(service, presentation_id, slide_number, image_url, x, y, scaleX=1, scaleY=1, width=1000000, height=1000000):
    """Add an image to a specified slide."""
    slide_id = get_slide_id_by_number(service, presentation_id, slide_number)
    suffix = generate_unique_suffix()
    object_id = f"Image_{slide_number}_{suffix}"  
    
    requests = [
        {
            "createImage": {
                "objectId": object_id,
                "url": image_url,
                "elementProperties": {
                    "pageObjectId": slide_id,  
                    "size": {
                        "height": {"magnitude": height, "unit": "EMU"},
                        "width": {"magnitude": width, "unit": "EMU"},
                    },
                    "transform": {
                        "scaleX": scaleX,
                        "scaleY": scaleY,
                        "translateX": x,
                        "translateY": y,
                        "unit": "EMU"
                    }
                }
            }
        }
    ]
    
    service.presentations().batchUpdate(
        presentationId=presentation_id,
        body={"requests": requests}
    ).execute()

def delete_all_elements_on_slide(service, presentation_id, slide_number):
    """Delete all elements on a specified slide."""
    slide_id = get_slide_id_by_number(service, presentation_id, slide_number)
    
    presentation = service.presentations().get(presentationId=presentation_id).execute()
    slides = presentation.get("slides", [])
    
    if 1 <= slide_number <= len(slides):
        slide = slides[slide_number - 1]
        page_elements = slide.get("pageElements", [])
        
        requests = [
            {
                "deleteObject": {
                    "objectId": element.get("objectId")
                }
            }
            for element in page_elements
        ]
        
        if requests:
            service.presentations().batchUpdate(
                presentationId=presentation_id,
                body={"requests": requests}
            ).execute()
    else:
        raise ValueError(f"Slide number {slide_number} is out of range.")
    
def copy_presentation(drive_service, original_presentation_id: str, new_name: str):
    body = {
        'name': new_name
    }
    copied_file = drive_service.files().copy(
        fileId=original_presentation_id,
        body=body
    ).execute()
    return copied_file

def drive_init(creds):
    """Initialize the Google Drive API service."""
    service = build("drive", "v3", credentials=creds)
    return service

def export_presentation(drive_service, presentation_id, export_format='application/pdf'):
    """Export a Google Slides presentation to a specified format and download it."""
    request = drive_service.files().export_media(
        fileId=presentation_id,
        mimeType=export_format
    )
    
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)
    
    done = False
    while done is False:
        status, done = downloader.next_chunk()
        print(f"Download {int(status.progress() * 100)}%.")
    
    fh.seek(0)
    return fh