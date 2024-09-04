"use client"
import {  useRouter } from "next/navigation";
import {  useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collisions";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("Parshav"); 
  
  const onClick = () => {
    router.push("/quiz");
  }

  return (
    <BackgroundBeamsWithCollision>
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen font-poppins w-full">
      <nav className="bg-white shadow-md">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-purple-600">Name</span>
              </div>
            </div>
            <div className="flex items-center">
              <ul className="flex space-x-4">
                {/* <li className="text-gray-600 hover:text-purple-600 transition">{name}</li> */}
                {/* <li className="text-gray-600 hover:text-purple-600 transition cursor-pointer">Login</li> */}
                <li className="text-gray-600 hover:text-purple-600 transition cursor-pointer">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col justify-center items-center h-[calc(100vh-4rem)] p-4">
        <h1 className="text-5xl font-extrabold text-center mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
            Generate Your Quiz
          </span>
        </h1>

        <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl">
          Upload your content and let our AI create a personalized quiz for you. Perfect for learning and assessment!
        </p>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <input type="file" className="mb-4 w-full p-2 border border-gray-300 rounded" />
          
          <button className="w-full py-3 px-6 mb-4 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition transform hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Generate Quiz
          </button>

          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe 
              src="https://www.youtube.com/" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>

          <button className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition mb-4">
            Get Presentation
          </button>

          <button
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={onClick}
          >
            Take the quiz!
          </button>
        </div>
      </div>
    </div>
    </BackgroundBeamsWithCollision>
  );
}