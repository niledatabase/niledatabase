"use client";
import { useEffect, useRef, useState } from "react";

export default function TextTyper({ words }: { words: string[] }) {
  const typingSpeed = 100;
  const pauseDuration = 1000;
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeWord, setActiveWord] = useState(words[activeIndex]);
  const [displayedText, setDisplayedText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  let timer = useRef<NodeJS.Timeout>();
  let nextWordTimer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    setActiveWord(words[activeIndex]);
  }, [activeIndex]);

  useEffect(() => {
    const currentString = activeWord[charIndex];

    timer.current = setTimeout(() => {
      if (!isDeleting) {
        if (currentString) {
          setDisplayedText(activeWord.substring(0, charIndex));
          setCharIndex(charIndex + 1);
        } else {
          setDisplayedText(activeWord);
          clearTimeout(nextWordTimer.current);
          nextWordTimer.current = setTimeout(() => {
            const nextWord = activeIndex + 1;
            if (nextWord < words.length) {
              setIsDeleting(true);
            }
          }, pauseDuration);
        }
      }
    }, typingSpeed / 2);

    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (nextWordTimer.current) clearTimeout(nextWordTimer.current);
    };
  }, [
    charIndex,
    isDeleting,
    activeWord,
    stringIndex,
    typingSpeed,
    pauseDuration,
  ]);

  useEffect(() => {
    if (isDeleting) {
      timer.current = setTimeout(() => {
        const nextIndex = charIndex - 1;
        if (charIndex <= 0) {
          setDisplayedText("");
          nextWordTimer.current = setTimeout(() => {
            setIsDeleting(false);
            setActiveIndex((index) => index + 1);
          }, pauseDuration);
        } else {
          setCharIndex(nextIndex);
          setDisplayedText(activeWord.substring(0, charIndex));
        }
      }, typingSpeed / 2);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (nextWordTimer.current) clearTimeout(nextWordTimer.current);
    };
  }, [isDeleting, charIndex, activeIndex]);

  return (
    <div>
      {displayedText}
      <span className="animate-pulse text-white">|</span>
    </div>
  );
}
