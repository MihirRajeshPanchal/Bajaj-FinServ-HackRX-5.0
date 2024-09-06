import React from 'react';
import Quiz from '../[...slug]/_components/quiz';

async function getQuizData(slug: string[]) {
  const filePath = slug.join('/');
  
  const response = await fetch('http://127.0.0.1:8000/quiz_generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic: "Benefit Plans",
      plan: "Hospital Cash Daily Allowance",
      document: "Brochure",
      no_of_questions: 5
    }),
  });
  
  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.text;
}

export default async function QuizPage({ params }: { params: { slug: string[] } }) {
  const quizData = await getQuizData(params.slug);

  if (!quizData) {
    return <div>Quiz not found</div>;
  }

  return <Quiz questions={quizData.questions} />;
}
