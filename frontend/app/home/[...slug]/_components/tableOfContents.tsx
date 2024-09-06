"use client";

import React from "react";
import { Space_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';

type TableOfContentsProps = {
  content: string;
};

const font = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  // This is a simple implementation. Adjust it as per your content structure.
  const toc = ["summary", "video", "transcript", "quiz"];

  return (
    <div className="w-64 fixed top-24 right-8 rounded-lg">
      <h2 className={cn("text-xl font-bold mb-4", font.className)}>Table of Contents</h2>
      <ul className="space-y-2">
        {toc.map((item, index) => (
          <li key={index}>
            <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-500 hover:text-blue-700">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
