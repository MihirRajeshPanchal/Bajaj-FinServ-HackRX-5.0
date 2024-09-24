const generateUniqueId = () => {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  };

  const getSlugInfo = () => {
    const pathname = window.location.pathname;
    const parts = pathname.split('/');
    return {
      topic: parts[2] ? parts[2].replace(/-/g, ' ') : '',
      plan: parts[3] ? parts[3].replace(/-/g, ' ') : '',
      document: parts[4] ? parts[4] : '',
    };
  };

  const slugInfo = getSlugInfo();

const submitQuizResults = async (score: number, wrongAnswers: number) => {
    const quizData = {
      uid: generateUniqueId(),
      topic: slugInfo.topic,
      plan: slugInfo.plan,
      document: slugInfo.document,
      noCorrectResponse: score,
      noWrongResponse: wrongAnswers
    };
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz_response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit quiz results');
      }
  
      console.log('Quiz results submitted successfully');
    } catch (error) {
      console.error('Error submitting quiz results:', error);
    }
  };

export default submitQuizResults;