from pydantic import BaseModel
from typing import List, Optional

class SlideCreationRequest(BaseModel):
    slide_number: int
    text: Optional[str] = None
    bullet: Optional[str] = None
    image_url: Optional[str] = None
    scaleX: Optional[int] = 1
    scaleY: Optional[int] = 1
    x: Optional[int] = None
    y: Optional[int] = None
    bold: Optional[bool] = False
    underline: Optional[bool] = False
    fontsize: Optional[int] = 18

class SlidesRequest(BaseModel):
    presentation_id: str
    name: str
    slides: List[SlideCreationRequest]