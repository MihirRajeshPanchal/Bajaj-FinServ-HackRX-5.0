import { formatSlugForApi } from "@/lib/utils";

interface Slide {
  slide_voiceover?: string;
}

interface SummaryResponse {
  text?: {
    summary?: string;
  };
}

interface SlideResponse {
  text?: {
    slides?: Slide[];
  };
}

interface PageData {
  content: string;
  videoUrl: undefined;
  transcript: string;
}

export async function getPageData(slug: string[]): Promise<PageData> {
  const [topic, plan, document] = slug.map(formatSlugForApi);

  const summaryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summary_generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic,
      plan,
      document,
    }),
  });

  const summaryData: SummaryResponse = await summaryResponse.json();
  const summary = summaryData?.text?.summary || 'No summary available.';

  const slideResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/slide_generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic,
      plan,
      document,
      num_slides: 5,
    }),
  });

  const slideData: SlideResponse = await slideResponse.json();
  const slides = slideData?.text?.slides || [];

  const transcript = slides
    .map(slide => slide.slide_voiceover)
    .filter((voiceover): voiceover is string => !!voiceover)
    .join('\n\n');

  return {
    content: summary,
    videoUrl: undefined,
    transcript: transcript || 'No transcript available.',
  };
}