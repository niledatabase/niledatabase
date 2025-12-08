'use client';

import { useState } from 'react';

type TabName = 'nile.ts' | 'route.ts' | 'page.jsx';

function highlightCode(code: string): string {
  const escapeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const lines = code.split('\n');
  const lineNumbers = lines
    .map(
      (_, i) =>
        `<span class="select-none text-[#636669] w-[40px] inline-block text-right pr-4">${
          i + 1
        }</span>`,
    )
    .join('\n');

  const highlightedCode = lines
    .map((line) => {
      let highlighted = escapeHtml(line);

      // Apply syntax highlighting
      highlighted = highlighted
        // Keywords
        .replace(
          /\b(const|let|var|return|export|default|async|await|function|import|from)\b/g,
          '<span style="color: #E06C75">$1</span>',
        )
        // Built-in objects and types
        .replace(
          /\b(Promise|String|Number|Boolean|Object|Array|RegExp)\b/g,
          '<span style="color: #E5C07B">$1</span>',
        )
        // JSX Components and HTML tags
        .replace(
          /(&lt;\/?)([\w-]+)/g,
          '$1<span style="color: #E06C75">$2</span>',
        )
        // JSX props
        .replace(
          /\b(\w+)=(&quot;|&#039;)/g,
          '<span style="color: #D19A66">$1</span>=$2',
        )
        // String literals
        .replace(
          /(&quot;.*?&quot;|&#039;.*?&#039;)/g,
          '<span style="color: #98C379">$1</span>',
        )
        // Imports and exports
        .replace(/({[^}]+})/g, '<span style="color: #61AFEF">$1</span>')
        // Function calls
        .replace(/\b(\w+)(?=\()/g, '<span style="color: #61AFEF">$1</span>')
        // Property access
        .replace(/\.(\w+)/g, '.<span style="color: #98C379">$1</span>');

      return highlighted;
    })
    .join('\n');

  return `<div class="flex">\n<div class="line-numbers">${lineNumbers}</div>\n<div class="code-content">${highlightedCode}</div>\n</div>`;
}

const codeExamples: Record<TabName, string> = {
  'nile.ts': `import { Nile } from "@niledatabase/server";

export const nile = await Nile();
export const { handlers } = nile.api;`,

  'route.ts': `import { handlers } from "./nile";

export const { POST, GET, DELETE, PUT } = handlers;`,

  'page.jsx': `import {
  SignOutButton,
  SignUpForm,
  SignedIn,
  SignedOut,
  TenantSelector,
  UserInfo,
} from "@niledatabase/react";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SignedIn className="flex flex-col gap-4">
        <UserInfo />
        <TenantSelector className="py-6 mb-10" />
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignUpForm createTenant />
      </SignedOut>
    </div>
  );
}`,
};

export default function CodeEditor() {
  const [activeTab, setActiveTab] = useState<TabName>('page.jsx');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="lg:w-1/2">
      <div className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]">
        {/* Mac-style window header */}
        <div className="flex items-center bg-[#141414] px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#FF5F57]"></div>
            <div className="h-3 w-3 rounded-full bg-[#FEBC2E]"></div>
            <div className="h-3 w-3 rounded-full bg-[#28C840]"></div>
          </div>
          {/* Tabs */}
          <div className="ml-6 flex gap-4">
            {(Object.keys(codeExamples) as TabName[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-sm transition-colors ${
                  activeTab === tab
                    ? 'rounded-md bg-[#1a1a1a] text-white/90'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/* Code content */}
        <div className="group relative p-6 font-mono text-sm">
          <button
            onClick={copyToClipboard}
            className="absolute right-8 top-8 rounded-md bg-[#2a2a2a] p-2 text-white/60 opacity-0 transition-opacity hover:bg-[#3a3a3a] hover:text-white/90 group-hover:opacity-100"
            title="Copy to clipboard"
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
          <pre
            className="w-[600px] overflow-x-auto leading-6 text-[#e4e4e4]"
            dangerouslySetInnerHTML={{
              __html: highlightCode(codeExamples[activeTab]),
            }}
          />
        </div>
      </div>
    </div>
  );
}
