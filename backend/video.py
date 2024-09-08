import os
import os
import json
import pyttsx3
import time
from moviepy.editor import ImageClip, AudioFileClip, concatenate_videoclips
from comtypes import client
from pdf2image import convert_from_path
from moviepy.editor import *



def ppt_to_pdf(ppt_path, pdf_path):
    powerpoint = client.CreateObject("Powerpoint.Application")
    powerpoint.Visible = 1
    ppt = powerpoint.Presentations.Open(ppt_path)
    ppt.SaveAs(pdf_path, 32)
    ppt.Close()
    powerpoint.Quit()


def init_text_to_speech_engine(rate=180, volume=1.0, voice_index=1):
    """Initialize the text-to-speech engine with specified rate, volume, and voice."""
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    engine.setProperty('rate', rate)
    engine.setProperty('volume', volume)
    engine.setProperty('voice', voices[voice_index].id)
    return engine


def create_voiceover(engine, text, file_name):
    """Create a voiceover from text and save it as an mp3 file."""
    engine.save_to_file(text, f"{file_name}.mp3")
    engine.runAndWait()


def generate_voiceovers(slides, engine, save_path):
    """Generate voiceovers for all slides."""
    os.makedirs(save_path, exist_ok=True)
    for slide in slides:
        voiceover_text = slide['slide_voiceover']
        slide_number = slide['slide_number']
        create_voiceover(engine, voiceover_text, f"{save_path}/voiceover_slide_{slide_number}")


def create_slide_video(image_path, audio_path, duration):
    """Create a video from an image and audio with the given duration."""
    image_clip = ImageClip(image_path).set_duration(duration)
    audio_clip = AudioFileClip(audio_path).set_duration(duration)
    video_clip = image_clip.set_audio(audio_clip)
    return video_clip


def convert_pdf_to_images(pdf_path, output_dir, dpi=300):
    """Convert a PDF to images and save each page as a PNG file."""
    os.makedirs(output_dir, exist_ok=True)
    
    pages = convert_from_path(pdf_path, dpi=dpi)
    image_paths = []
    for i, page in enumerate(pages):
        image_path = os.path.join(output_dir, f'slide_{i+1}.png')
        page.save(image_path, 'PNG')
        image_paths.append(image_path)
    return image_paths

def create_slide_videos(slides, image_paths,save_path):
    """Create video clips for all slides."""
    slide_videos = []
    for slide in slides:
        image_path = image_paths[slide['slide_number'] - 1]
        audio_path = f"{save_path}/voiceover_slide_{slide['slide_number']}.mp3"
        duration = AudioFileClip(audio_path).duration
        slide_video = create_slide_video(image_path, audio_path, duration)
        slide_videos.append(slide_video)
    return slide_videos


def save_final_presentation(slide_videos, output_file, fps=24):
    """Concatenate slide videos and save the final presentation."""
    final_video = concatenate_videoclips(slide_videos)
    final_video.write_videofile(output_file, fps=fps)