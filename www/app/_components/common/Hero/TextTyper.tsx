'use client';
import { useEffect, useRef, useState } from 'react';

export default function TextTyper({ words }: { words: string[] }) {
  const typingSpeed = 100;
  const pauseDuration = 1000;
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeWord, setActiveWord] = useState(words[activeIndex]);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  let timer = useRef<NodeJS.Timeout>(undefined);
  let nextWordTimer = useRef<NodeJS.Timeout>(undefined);
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
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    }, typingSpeed / 2);

    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (nextWordTimer.current) clearTimeout(nextWordTimer.current);
    };
  }, [charIndex, isDeleting, activeWord, typingSpeed, pauseDuration]);

  useEffect(() => {
    if (isDeleting) {
      timer.current = setTimeout(() => {
        const nextIndex = charIndex - 1;
        if (charIndex <= 0) {
          setDisplayedText('');
          nextWordTimer.current = setTimeout(() => {
            setIsDeleting(false);
            setActiveIndex((index) => {
              const next = index + 1;
              if (next >= words.length) {
                return 0;
              }
              return next;
            });
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
