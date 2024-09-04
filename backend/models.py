from pydantic import BaseModel
from typing import List, Optional

class Slide(BaseModel):
    slide_number : int
    slide_main_title: Optional[str] = None
    slide_main_subtitle: Optional[str] = None
    slide_voiceover: Optional[str] = None
    slide_title: Optional[str] = None
    bullet_points: Optional[List[str]] = None
    slide_disclaimer: Optional[str] = None
    slide_ending_note: Optional[str] = None

class SlidesRequest(BaseModel):
    presentation_id: str
    file_path: str
    name: Optional[str] = None
    slides: Optional[List[Slide]] = None
    
class RagRequest(BaseModel):
    file_path: str
    
class Question(BaseModel):
    questionText: str
    questionOptions: List[str]
    questionAnswerIndex: int

class QuizResponse(BaseModel):
    questions: List[Question]

class QuizRequest(BaseModel):
    no_of_questions: int
    file_path: str
    
class SlideRequest(BaseModel):
    num_slides: int
    file_path: str