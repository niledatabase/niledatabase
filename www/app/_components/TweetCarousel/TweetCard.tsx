'use client';

import Image from 'next/image';

export type Tweet = {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    title?: string;
  };
  content: string;
};

export function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <div className="flex h-[250px] flex-col rounded-2xl border border-[#2f3336] bg-[#16181c] p-4">
      {/* Author Section */}
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-zinc-800 to-zinc-700">
          <Image
            src={tweet.author.avatar}
            alt={`${tweet.author.name}'s profile picture`}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white hover:underline">
            {tweet.author.name}
          </span>
          {tweet.author.title && (
            <span className="mt-0.5 text-sm text-zinc-400">
              {tweet.author.title}
            </span>
          )}
        </div>
        <div className="ml-auto">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-3 line-clamp-4 text-[15px] leading-normal text-white/90">
        {tweet.content}
      </div>

      {/* Read More Button */}
      <a
        href={`https://x.com/i/status/${tweet.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto block pt-4"
      >
        <button className="w-full rounded-full border border-zinc-700 bg-black px-4 py-2 font-bold text-white transition-colors hover:bg-zinc-900">
          View on X
        </button>
      </a>
    </div>
  );
}
