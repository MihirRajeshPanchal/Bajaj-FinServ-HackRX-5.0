import { formatBodyData } from "@/lib/utils";
  
  export async function getQuiz(slug: string[]) {
    const [topic, plan, document] = slug.map(formatBodyData);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz_generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,   
        plan,      
        document,  
        no_of_questions: 5,  
      }),
    });
  
    if (!response.ok) {
      return null;
    }
  
    const data = await response.json();
    return data.text;
  }
  