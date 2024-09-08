"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

interface QuizButtonProps {
  path: string;
}

const QuizButton: React.FC<QuizButtonProps> = ({ path }) => {
  const router = useRouter();

  const handleQuizClick = () => {
    router.push(`${path}/quiz`);
  };

  return (
    <button
      onClick={handleQuizClick}
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 mt-8 rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg"
    >
      Take Quiz
    </button>
  );
};

export default QuizButton;