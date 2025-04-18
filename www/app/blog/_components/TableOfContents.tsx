"use client";

import { useEffect, useState } from "react";
import { slugify } from "./addHeadingIds";

interface Heading {
  text: string;
  level: number;
}

interface Props {
  headings: Heading[];
}

export function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Set up intersection observer for headings
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.querySelector(`#${slugify(heading.text)}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <line x1="21" y1="10" x2="7" y2="10"></line>
          <line x1="21" y1="6" x2="3" y2="6"></line>
          <line x1="21" y1="14" x2="3" y2="14"></line>
          <line x1="21" y1="18" x2="7" y2="18"></line>
        </svg>
        <span className="text-[14px] font-medium opacity-70">On this page</span>
      </div>
      <nav className="space-y-4">
        {headings.map((heading, i) => (
          <a
            key={i}
            href={`#${slugify(heading.text)}`}
            className={`
              block text-[14px] transition-colors duration-200 break-words
              ${
                activeId === slugify(heading.text)
                  ? "text-[#fdb768] font-medium"
                  : "text-gray-400 opacity-50 hover:text-gray-200 hover:opacity-100"
              }
              ${heading.level === 3 ? "ml-4" : ""}
            `}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
