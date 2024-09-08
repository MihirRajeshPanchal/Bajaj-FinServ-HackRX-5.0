"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Space_Mono } from "next/font/google";

const font = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface FormData {
  topic: string;
  plan: string;
  document: string;
  pdf_link: string;
  presentation_id: string;
}

export default function GenerateVideoForm() {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    plan: '',
    document: '',
    pdf_link: '',
    presentation_id: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 mx-auto">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold text-gray-900 ${font.className}`}>
            Generate Video Lectures
          </h2>
        </div>
        <form className="mt-8 space-y-6 border-1 p-8" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {(Object.keys(formData) as Array<keyof FormData>).map((key, index) => (
              <div key={key} className={index === 0 ? '' : 'mt-4'}>
                <label htmlFor={key} className="sr-only">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                </label>
                <input
                  id={key}
                  name={key}
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 shadow-lg"
            >
              Generate Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}