"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export default function CopyToClipboard({
  children,
}: {
  children: JSX.Element;
}) {
  const textInput = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timer>(undefined);
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    setCopied(true);
    if (textInput.current !== null && textInput.current.textContent !== null) {
      await navigator.clipboard
        .writeText(textInput.current.textContent)
        .catch((e) => {
          // iframes may cause this to fail, so be quiet.
        });
      if (typeof window !== "undefined") {
        // *, because this is just going to be publicly accessible docs
        window.parent.postMessage({ copy: textInput.current.textContent }, "*");
      }
    }
    timer.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const showCopyButton = children?.props.className?.includes("hljs");

  if (!showCopyButton) {
    return <pre>{children}</pre>;
  }

  return (
    <div ref={textInput} className="relative code-block">
      <button
        aria-label="Copy code"
        type="button"
        className="absolute right-2 top-2 w-8 h-8 p-1 rounded bg-gray-700 dark:bg-gray-800"
        onClick={onCopy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="14px"
          height="14px"
          className={`${
            copied ? "opacity-100" : "opacity-0"
          } absolute transition-opacity`}
        >
          <path
            stroke="green"
            strokeWidth="4"
            fill="green"
            d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className={`${
            copied ? "opacity-0" : "opacity-100"
          } absolute transition-opacity`}
        >
          <g opacity="0.5">
            <path
              d="M1 5C1 4.44772 1.44772 4 2 4H9C9.55228 4 10 4.44772 10 5V12C10 12.5523 9.55228 13 9 13H2C1.44772 13 1 12.5523 1 12V5Z"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M3 1.00004L11 1.00001C12.1046 1 13 1.89544 13 3.00001V11"
              stroke="white"
              strokeWidth="2"
            />
          </g>
        </svg>
      </button>
      <pre>{children}</pre>
    </div>
  );
}
