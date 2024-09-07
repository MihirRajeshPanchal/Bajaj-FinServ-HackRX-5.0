function capitalizeWords(str: string) {
    return str
      .split('-') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' '); 
  }
  
  export async function getQuiz(slug: string[]) {
    const [topic, plan, document] = slug.map(capitalizeWords);
    console.log(topic, plan, document);
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
  