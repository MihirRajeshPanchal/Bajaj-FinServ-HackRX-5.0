"use client";

import React, { useEffect, useState } from "react";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

type TableOfContentsProps = {
  content: string;
};

const font = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const toc = React.useMemo(() => ["Introduction", "Video", "Transcript", "Quiz"], []);

  const [currentSection, setCurrentSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = toc.map((item) =>
        document.getElementById(item.toLowerCase())
      );

      const offset = 500; 
      const scrollPosition = window.scrollY + offset;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentSection(toc[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  return (
    <div className="hidden lg:block h-fit sticky top-14 py-14 px-4 xl:px-14">
      <h2 className={cn("text-xl font-bold mb-4", font.className)}>
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {toc.map((item, index) => (
          <li key={index}>
            <Link
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-blue-500 hover:text-blue-700 transition duration-300",
                currentSection === item ? "border-l-4 border-primary pl-2" : ""
              )}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
