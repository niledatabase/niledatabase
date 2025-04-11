"use client";

import Image from "next/image";

export type Tweet = {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
};

export function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <div className="bg-[#16181c] rounded-2xl border border-[#2f3336] p-4 h-[300px] flex flex-col">
      {/* Author Section */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-700">
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
          <span className="text-zinc-500">{tweet.author.handle}</span>
        </div>
        <div className="ml-auto">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-3 text-[15px] leading-normal text-white/90 line-clamp-4">
        {tweet.content}
      </div>

      {/* Read More Button */}
      <a 
        href={`https://x.com/i/status/${tweet.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto pt-4 block"
      >
        <button className="w-full bg-black hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded-full transition-colors border border-zinc-700">
          View on X
        </button>
      </a>
    </div>
  );
} 