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
      className="mx-auto block h-full py-3.5 px-6 rounded-full bg-accent font-medium text-white shadow-[4px_4px_black] -translate-x-0.5 -translate-y-0.5 hover:translate-x-0 hover:translate-y-0 hover:shadow-[0px_0px_black] transition-[transform,box-shadow]"
    >
      Take Quiz
    </button>
  );
};

export default QuizButton;