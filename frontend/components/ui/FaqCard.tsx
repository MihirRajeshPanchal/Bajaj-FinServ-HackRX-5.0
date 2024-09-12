"use client"
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react'

export default function FaqCard({ title, content }: { title: string, content: string }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className="p-4 rounded-lg mx-auto my-2 w-full cursor-pointer border border-b-stone-900"
      style={{ backgroundColor: '#e5ebf6', borderBottom: '1px solid #d1d5db' }}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center ">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-blue-500 font-bold text-xl">
          {isActive ? '-' : '+'}
        </span>
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.1 }}
            className="overflow-hidden mt-4"
          >
            <p className="text-gray-700">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}