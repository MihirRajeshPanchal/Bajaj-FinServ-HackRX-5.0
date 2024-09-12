import { Poppins, Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";

const font = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Home() {
  return (
    <div className="pageWrapper | lg:px-12l overflow-hidden [grid-area:1/-1] lg:[grid-area:auto]">
      <section className="hero min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-purple-200 text-text text-center py-16">
        <h1 className={cn("text-5xl lg:text-7xl font-bold mb-4", poppins.className)}>
          Get Started
        </h1>
        <h1 className="text-5xl lg:text-7xl font-bold mb-4">
          with {" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">HackRx</span>
        </h1>
        <p className={cn("text-xl lg:text-2xl mb-8", font.className)}>
          From Documents to Dynamic Videos: Transforming Content, Engaging Minds.
        </p>
        <div className="flex gap-4">
          <Link href="#howItWorks" className="smooth-scroll">
            <button className={cn("py-3 px-6 rounded-full border-2 border-white bg-transparent text-text font-medium hover:bg-white hover:text-blue-500 transition duration-300", font.className)}>
              How it Works?
            </button>
          </Link>
          {/* <button className={cn("py-3 px-6 rounded-full bg-white text-blue-500 font-medium shadow-lg hover:bg-gray-100 transition duration-300", font.className)}>
                Get Started
            </button> */}
        </div>
      </section>

      {/* Get Started Section */}
      <section className="getStarted py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className={cn("text-4xl font-bold mb-6", font.className)}>Your Journey Starts Here</h2>
          <p className="text-lg mb-8">
            Discover the key features of HackRx and how it can help you streamline your workflow.
          </p>
          <div className="mx-3 flex flex-col lg:flex-row justify-center gap-8">
            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Generate Quizzes</h3>
              <p>Create quizzes from your PDFs to test knowledge and track progress.</p>
            </div>
            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Create Videos</h3>
              <p>Automatically generate videos from your documents with ease.</p>
            </div>
            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Interactive Dashboard</h3>
              <p>Track your progress and manage your content through an intuitive interface.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="howItWorks" className="howItWorks py-16">
        <div className="container mx-auto">
          <h2 className={cn("text-4xl font-bold text-center mb-8", font.className)}>How It Works</h2>
          <div className="mx-3 flex flex-col lg:flex-row gap-8">
            <div className="step-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Step 1</h3>
              <p>Start with uploading your PDF files to the platform.</p>
            </div>
            <div className="step-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Step 2</h3>
              <p>Choose whether you want to generate a quiz or a video from the uploaded content.</p>
            </div>
            <div className="step-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Step 3</h3>
              <p>Customize the output and review it before finalizing.</p>
            </div>
            <div className="step-card bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Step 4</h3>
              <p>Export your quizzes or videos and share them with your audience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explaining the /home Pages Section */}
      <section className="explaining py-16 px-3 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className={cn("text-4xl font-bold mb-6", font.className)}>Exploring the Home Pages</h2>
          <p className="text-lg">
            The /home pages are designed to be your central hub for managing content, exploring features, and getting started with HackRx. Navigate through different sections to find tutorials, resources, and tools that will enhance your experience.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-8 px-3 bg-gradient-to-r from-blue-100 to-purple-200 text-black text-center">
        <p className="text-lg">Made with love by the HackRx Dev Team 💝</p>
      </footer>
    </div>
  );
}
