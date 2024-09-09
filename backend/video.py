import os
import os
from moviepy.editor import ImageClip, AudioFileClip, concatenate_videoclips
from pdf2image import convert_from_path
from moviepy.editor import *
import edge_tts


def create_voiceover(TEXT, OUTPUT_FILE):
    """Create a voiceover from text and save it as an mp3 file."""
    VOICE = "en-GB-RyanNeural"
    communicate = edge_tts.Communicate(TEXT, VOICE)
    with open(OUTPUT_FILE+".mp3", "wb") as file:
        for chunk in communicate.stream_sync():
            if chunk["type"] == "audio":
                file.write(chunk["data"])


def generate_voiceovers(slides, save_path):
    """Generate voiceovers for all slides."""
    os.makedirs(save_path, exist_ok=True)
    for slide in slides:
        voiceover_text = slide["slide_voiceover"]
        slide_number = slide["slide_number"]
        create_voiceover(voiceover_text, f"{save_path}/voiceover_slide_{slide_number}")


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
        image_path = os.path.join(output_dir, f"slide_{i+1}.png")
        page.save(image_path, "PNG")
        image_paths.append(image_path)
    return image_paths


def create_slide_videos(slides, image_paths, save_path):
    """Create video clips for all slides."""
    slide_videos = []
    for slide in slides:
        image_path = image_paths[slide["slide_number"] - 1]
        audio_path = f"{save_path}/voiceover_slide_{slide['slide_number']}.mp3"
        duration = AudioFileClip(audio_path).duration
        slide_video = create_slide_video(image_path, audio_path, duration)
        slide_videos.append(slide_video)
    return slide_videos


def save_final_presentation(slide_videos, output_file, fps=24):
    """Concatenate slide videos and save the final presentation."""
    final_video = concatenate_videoclips(slide_videos)
    final_video.write_videofile(output_file, fps=fps)
