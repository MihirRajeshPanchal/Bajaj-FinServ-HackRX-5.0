import { Space_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import TranscriptSection from "./_components/transcriptSection";
import TableOfContents from "./_components/tableOfContents";
type PageData = {
  title: string;
  content: string;
  videoUrl?: string;
  transcript?: string;
};

const font = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

async function getPageData(slug: string[]): Promise<PageData> {
  const filePath = slug.join('/');
  console.log('Fetching data for:', filePath);
  return {
    title: slug[slug.length - 1],
    content: `This is the content for ${filePath} lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    videoUrl: undefined,
    transcript: "This is a sample transcript for the video. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const pageData = await getPageData(params.slug);

  if (!pageData) {
    notFound();
  }

  const context = params.slug.slice(0, -1).join(" / ");

  return (
    <div className=" pt-24 pl-24 pr-48 relative">
      <div className="container mx-auto py-8">
        <p className={cn("text-sm text-gray-500 mb-2", font.className)}>{context}</p>
        <h1 className={cn("text-4xl font-bold mb-6", font.className)}>{pageData.title}</h1>
        <div className="flex gap-8">
          <div className="flex-grow">
            <p className="mb-8 leading-relaxed font-sans">{pageData.content}</p>
            <div className="space-y-4">
              {pageData.videoUrl ? (
                <div className="aspect-video mb-4">
                  <iframe src={pageData.videoUrl} className="w-full h-full" allowFullScreen />
                </div>
              ) : (
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg">Generate video</button>
              )}
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg">Take Quiz</button>
            </div>
            <TranscriptSection transcript={pageData.transcript} />
          </div>
          <TableOfContents content={pageData.content} />
        </div>
      </div>
    </div>
  );
}
