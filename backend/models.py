from pydantic import BaseModel
from typing import List, Optional


class Slide(BaseModel):
    slide_number: int
    slide_main_title: Optional[str] = None
    slide_main_subtitle: Optional[str] = None
    slide_voiceover: Optional[str] = None
    slide_title: Optional[str] = None
    bullet_points: Optional[List[str]] = None
    slide_disclaimer: Optional[str] = None
    slide_ending_note: Optional[str] = None


class SlidesRequest(BaseModel):
    presentation_id: str
    topic: str
    plan: str
    document: str
    name: Optional[str] = None
    slides: Optional[List[Slide]] = None


class RagRequest(BaseModel):
    topic: str
    plan: str
    document: str
    pdf_link: str


class QuizResponse(BaseModel):
    uid: str
    topic: str
    plan: str
    document: str
    noCorrectResponse: int
    noWrongResponse: int


class QuizRequest(BaseModel):
    topic: str
    plan: str
    document: str
    no_of_questions: int


class SlideRequest(BaseModel):
    num_slides: int
    topic: str
    plan: str
    document: str


class SummaryRequest(BaseModel):
    topic: str
    plan: str
    document: str


class FrontendJson(BaseModel):
    topic: str
    plan: str
    document: str


class VideoRequest(BaseModel):
    topic: str
    plan: str
    document: str

class PDFRequest(BaseModel):
    topic: str
    plan: str
    document: str
    
class AllInOneRequest(BaseModel):
    topic: str
    plan: str
    document: str
    pdf_link: str
    no_of_questions: int
    num_slides: int
    presentation_id: str
