import { Space_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import TranscriptSection from "./_components/transcriptSection";
import TableOfContents from "./_components/tableOfContents";
import QuizButton from "./_components/quizButton";
import Quiz from "./_components/quiz";
import { getQuiz } from "../../api/getQuiz";
import SidebarData from "../_components/sidebarData";
import { getPageData } from "@/app/api/getPagedData";

const font = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function Page({ params }: { params: { slug: string[] } }) {
  const isQuiz = params.slug[params.slug.length - 1] === 'quiz';
  const contentSlug = isQuiz ? params.slug.slice(0, -1) : params.slug;

  const pageData = await getPageData(contentSlug);

  if (isQuiz) {
    const quizData = await getQuiz(contentSlug);
    if (!quizData) {
      notFound();
    }
    return <Quiz questions={quizData.questions} />;
  }

  if (!pageData) {
    notFound();
  }

  const context = contentSlug.slice(0, -1).join(" / ");
  const title = contentSlug[contentSlug.length - 1];
  const currentPath = `/home/${contentSlug.join('/')}`;

  return (
    <div className="grid grid-flow-col gap-4 pt-14">
      <div className="py-16 px-[clamp(2rem,3.125vw,4rem)]">
        <p className={cn("text-sm text-gray-500 mb-2", font.className)}>{context}</p>
        <h1 className={cn("text-4xl font-bold mb-6", font.className)}>{title}</h1>
        <div className="flex gap-8">
          <div className="flex-grow">
            <p className="mb-8 leading-relaxed font-sans">{pageData.content}</p>
            <div className="space-y-4">
              {pageData.videoUrl ? (
                <div className="aspect-video mb-4">
                  <iframe src={pageData.videoUrl} className="w-full h-full" allowFullScreen />
                </div>
              ) : (
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg">
                  Generate video
                </button>
              )}
              <QuizButton path={currentPath} />
            </div>
            <TranscriptSection transcript={pageData.transcript} />
          </div>
        </div>
      </div>
      <TableOfContents content={pageData.content} />
    </div>
  );
}
