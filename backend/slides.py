from googleapiclient.discovery import build
from backend.models import Slide
from backend.utils import (
    add_custom_text_to_slide,
    add_image_to_slide,
    add_bullet_text_to_slide,
)


def build_slide(service, presentation_id, slide_request: Slide):
    if slide_request.slide_main_title != None:
        add_custom_text_to_slide(
            service=service,
            presentation_id=presentation_id,
            slide_number=slide_request.slide_number,
            text=slide_request.slide_main_title,
            x=3500000,
            y=2000000,
            bold=True,
            underline=False,
            fontsize=30,
        )
    if slide_request.slide_main_subtitle != None:
        add_custom_text_to_slide(
            service=service,
            presentation_id=presentation_id,
            slide_number=slide_request.slide_number,
            text=slide_request.slide_main_subtitle,
            x=3500000,
            y=3000000,
            bold=True,
            underline=False,
            fontsize=10,
        )
    if slide_request.slide_title != None:
        add_custom_text_to_slide(
            service=service,
            presentation_id=presentation_id,
            slide_number=slide_request.slide_number,
            text=slide_request.slide_title,
            x=1200000,
            y=400000,
            width=6000000,
            bold=True,
            underline=False,
            fontsize=30,
        )

    if slide_request.bullet_points != None:
        if slide_request.slide_number % 2 == 0:
            add_bullet_text_to_slide(
                service=service,
                presentation_id=presentation_id,
                slide_number=slide_request.slide_number,
                bullet_points=slide_request.bullet_points,
                x=4000000,
                y=1600000,
                fontsize=18,
                height=3500000,
                width=5000000,
            )
        else:
            add_bullet_text_to_slide(
                service=service,
                presentation_id=presentation_id,
                slide_number=slide_request.slide_number,
                bullet_points=slide_request.bullet_points,
                x=550000,
                y=1600000,
                fontsize=18,
                height=3500000,
                width=6000000,
            )

    if slide_request.slide_disclaimer != None:
        add_custom_text_to_slide(
            service=service,
            presentation_id=presentation_id,
            slide_number=slide_request.slide_number,
            text=slide_request.slide_disclaimer,
            x=1000000,
            y=1000000,
            width=6000000,
            bold=True,
            underline=False,
            fontsize=25,
        )
    if slide_request.slide_ending_note != None:
        add_custom_text_to_slide(
            service=service,
            presentation_id=presentation_id,
            slide_number=slide_request.slide_number,
            text=slide_request.slide_ending_note,
            x=2500000,
            y=4000000,
            bold=True,
            underline=False,
            fontsize=10,
        )


def slides_init(creds):
    service = build("slides", "v1", credentials=creds)
    return service
