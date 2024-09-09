import { formatData } from "@/lib/utils";

export async function generateVideo(data: {
    topic: string;
    plan: string;
    document: string;
    pdf_link: string;
    no_of_questions: number;
    num_slides: number;
    presentation_id: string;
  }) {

    data.topic = formatData(data.topic);
    data.plan = formatData(data.plan);
    data.document = formatData(data.document);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all_in_one`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await res.json();
    return result;
  }
  