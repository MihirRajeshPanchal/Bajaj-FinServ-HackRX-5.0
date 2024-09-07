"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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
  const router = useRouter(); 

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
    }

    setTimeout(moveToNextQuestion, 1000);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setQuizFinished(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setTimeLeft(30);
      setShowAnswer(false);
    }
  };

  

  if (quizFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans"
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
    <div className="min-h-screen bg-background flex items-center justify-center font-sans p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-secondary rounded-lg shadow-2xl p-8 max-w-2xl w-full border border-gray-700"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full font-bold text-white">
            Question {currentQuestionIndex + 1}/{questions.length}
          </h1>
          <p className="text-black-400">Score: {score}</p>
        </div>
        <h2 className="text-2xl font-semibold text-white mb-6">
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
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              } ${
                showAnswer
                  ? option === currentQuestion.questionOptions[currentQuestion.questionAnswerIndex]
                    ? "bg-green-500 text-white"
                    : selectedOption === option
                    ? "bg-red-500 text-white"
                    : ""
                  : ""
              } border border-gray-600`}
            >
              {option}
            </motion.button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-blue-400">Time left: {timeLeft} seconds</p>
          <motion.button
            onClick={handleSubmitAnswer}
            disabled={!selectedOption && !showAnswer}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300 disabled:opacity-50 shadow-lg"
          >
            {showAnswer ? 'Next Question' : 'Submit Answer'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;