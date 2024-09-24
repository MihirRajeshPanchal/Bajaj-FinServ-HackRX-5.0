"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Timer } from 'lucide-react';
import submitQuizResults from '@/app/api/submitQuizResults';

type Question = {
  questionText: string;
  questionOptions: string[];
  questionAnswerIndex: number;
};

type QuizProps = {
  questions: Question[];
};

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const router = useRouter();

  // Function to generate a unique ID
  // const generateUniqueId = () => {
  //   return Math.floor(100000000 + Math.random() * 900000000).toString();
  // };

  // // Extract slug information
  // const getSlugInfo = () => {
  //   const pathname = window.location.pathname;
  //   const parts = pathname.split('/');
  //   return {
  //     topic: parts[2] ? parts[2].replace(/-/g, ' ') : '',
  //     plan: parts[3] ? parts[3].replace(/-/g, ' ') : '',
  //     document: parts[4] ? parts[4] : '',
  //   };
  // };

  // const slugInfo = getSlugInfo();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0 && !showAnswer) {
          return prevTime - 1;
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showAnswer]);

  useEffect(() => {
    if (timeLeft === 0 && !showAnswer) {
      handleSubmitAnswer();
    }
  }, [timeLeft, showAnswer]);

  const handleOptionClick = (option: string) => {
    if (!showAnswer) {
      setSelectedOption(option);
    }
  };

  const handleSubmitAnswer = () => {
    setShowAnswer(true);
    const currentQuestion = questions[currentQuestionIndex];
    if (
      selectedOption === currentQuestion.questionOptions[currentQuestion.questionAnswerIndex]
    ) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setWrongAnswers((prevWrong) => prevWrong + 1);
    }

    setTimeout(moveToNextQuestion, 1000);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setQuizFinished(true);
      submitQuizResults(score, wrongAnswers);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setTimeLeft(30);
      setShowAnswer(false);
    }
  };

  // const submitQuizResults = async () => {
  //   const quizData = {
  //     uid: generateUniqueId(),
  //     topic: slugInfo.topic,
  //     plan: slugInfo.plan,
  //     document: slugInfo.document,
  //     noCorrectResponse: score,
  //     noWrongResponse: wrongAnswers
  //   };

  //   try {
  //     const response = await fetch('/api/submit-quiz', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(quizData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to submit quiz results');
  //     }

  //     console.log('Quiz results submitted successfully');
  //   } catch (error) {
  //     console.error('Error submitting quiz results:', error);
  //   }
  // };

  if (quizFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-screen ~bg-background text-black font-sans col-span-full"
      >
        <h1 className="text-4xl font-bold mb-8">Quiz Finished!</h1>
        <p className="text-2xl mb-4">
          Your score is: {score} / {questions.length}
        </p>
        {score === questions.length && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="text-5xl mb-8"
          >
            🎉
          </motion.div>
        )}
        <button
          onClick={() => router.push('/home')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg"
        >
          Back to home
        </button>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz | min-h-screen flex items-center justify-center font-sans p-4 col-span-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[hsl(0,0%,100%,0.2)] backdrop-blur-[1px] rounded-lg shadow-2xl p-8 w-[min(1024px,100%)]"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="bg-background border-2 border-text to-50% px-4 py-2 rounded-full font-medium text-text">
            Question {currentQuestionIndex + 1}/{questions.length}
          </h1>
        </div>
        <h2 className="text-2xl font-semibold text-text mb-6">
          {currentQuestion.questionText}
        </h2>

        <div className="space-y-4 mb-6">
          {currentQuestion.questionOptions.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={showAnswer}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left p-4 rounded-lg transition duration-300 ${
                selectedOption === option
                  ? "bg-blue-600 text-background"
                  : "bg-gray-600 text-gray-200 hover:bg-gray-600"
              } ${
                showAnswer
                  ? option === currentQuestion.questionOptions[currentQuestion.questionAnswerIndex]
                    ? "bg-green-500 text-text"
                    : selectedOption === option
                    ? "bg-red-500 text-text"
                    : ""
                  : ""
              } border border-gray-600`}
            >
              {option}
            </motion.button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-text flex items-end gap-0.5"><Timer/><span className='font-medium'>{timeLeft}</span>seconds</p>
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedOption && !showAnswer}
            className="disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[0px_0px_black] h-full py-3.5 px-6 ~rounded-full hover:cursor-pointer bg-accent font-medium text-white shadow-[4px_4px_black] -translate-x-0.5 -translate-y-0.5 hover:translate-x-0 hover:translate-y-0 hover:shadow-[0px_0px_black] transition-[transform,box-shadow]"
          >
            {showAnswer ? 'Next Question' : 'Submit Answer'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;