"use client";
import "highlight.js/styles/github-dark.css";
import SyntaxHighlighter from "react-syntax-highlighter";
export default function Code({ codeString }: { codeString: string }) {
  return (
    <SyntaxHighlighter
      className="rounded-lg"
      language="bash"
      useInlineStyles={false}
      wrapLongLines={true}
    >
      {codeString}
    </SyntaxHighlighter>
  );
}