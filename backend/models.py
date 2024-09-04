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