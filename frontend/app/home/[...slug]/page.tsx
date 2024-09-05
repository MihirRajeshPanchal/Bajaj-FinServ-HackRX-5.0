import { notFound } from 'next/navigation';
import React from 'react';

type PageData = {
  title: string;
  content: string;
  videoUrl?: string;
};

async function getPageData(slug: string[]): Promise<PageData> {
  const filePath = slug.join('/');
  // Replace this with your actual API call
  console.log('Fetching data for:', filePath);
  // Simulated API response
  return {
    title: slug[slug.length - 1],
    content: `This is the content for ${filePath}`,
    videoUrl: undefined,
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const pageData = await getPageData(params.slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{pageData.title}</h1>
      <p className="mb-4">{pageData.content}</p>
      {pageData.videoUrl ? (
        <div className="aspect-video mb-4">
          <iframe src={pageData.videoUrl} className="w-full h-full" allowFullScreen />
        </div>
      ) : (
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Generate Video</button>
      )}
      <button className="bg-green-500 text-white px-4 py-2 rounded ml-4">Take Quiz</button>
    </div>
  );
}