'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  lines: Array<Array<{ text: string; comma?: boolean; color: string }>>;
  allowTyping: boolean;
};

export default function CodeTyper({ lines, allowTyping }: Props) {
  const lastLine = lines[lines.length - 1];
  const lastWord = lastLine[lastLine.length - 1];
  const lastLetter = lastWord.text.length - 1;

  const [position, setPosition] = useState([
    lines.length - 1,
    lastLine.length - 1,
    lastLetter,
  ]);
  let timer = useRef<NodeJS.Timeout>(undefined);

  const lineNumber = useMemo(() => {
    return position[0];
  }, [position[0]]);

  const wordPosition = useMemo(() => {
    return position[1];
  }, [position[1]]);

  const letterPosition = useMemo(() => {
    return position[2];
  }, [position[2]]);

  /*
  useEffect(() => {
    if (!allowTyping) {
      clearTimeout(timer.current);
      return;
    }
    timer.current = setTimeout(() => {
      setPosition(([line, word, letter]) => {
        if (line === lines.length) {
          return [line, word, letter];
        }
        const words = lines[line];
        const currentWord = lines[line][word];

        if (words.length === 0) {
          return [line + 1, 0, 0];
        }

        if (!currentWord) {
          return [line, word, letter];
        }
        if (currentWord.text.length === letter) {
          return [line, word + 1, 0];
        }
        if (words.length - 1 === word) {
          return [line + 1, 0, 0];
        }
        return [line, word, letter + 1];
      });
    }, 50);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [lineNumber, wordPosition, letterPosition, allowTyping]);
  */

  return (
    <div className="relative w-full pl-5" style={{ height: lines.length * 18 }}>
      {lines.map((words, line) => {
        let currentWordPosition = wordPosition;
        if (line > lineNumber) {
          return null;
        } else if (line < lineNumber) {
          currentWordPosition = words.length;
        }
        return (
          <div
            key={`${line}${wordPosition}`}
            className="absolute inline h-4 whitespace-nowrap leading-4"
            style={{ top: line * 18 }}
          >
            {words.map((word, currentWord) => {
              let currentLetterPosition = letterPosition;
              if (currentWord > currentWordPosition) {
                return null;
              } else if (currentWord < currentWordPosition) {
                currentLetterPosition = word.text.length;
              }
              return (
                <span
                  style={{ color: word.color }}
                  key={`${line}${word.text}${currentWord}`}
                >
                  <TextTyper
                    position={currentLetterPosition}
                    text={word.text}
                  />
                </span>
              );
            })}
            {line === lineNumber && timer.current ? (
              <span className="animate-pulse text-white">|</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function TextTyper({ position, text }: { position: number; text: string }) {
  return text.substring(0, position);
}
