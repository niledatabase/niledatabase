"use client";
import Link from "next/link";
import Image from "next/image";
import "./storeScroll";
import GithubStar from "./githubStar";
import GradientButton from "../GradientButton";

export default function Navigation({ className }: { className?: string }) {
  return (
    <div
      className={`navBlur flex flex-row flex-1 w-full sticky top-0 z-50 ${className}`}
    >
      <div className="flex flex-row items-center justify-between px-28 flex-1 lg:h-auto h-[76px]">
        <div className="w-full items-center flex lg:block lg:items-start lg:w-44 ">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Nile Logo"
              width={80}
              height={30}
              priority
              className="m-auto scale-[2.1] lg:m-0 lg:scale-100 lg:translate-y-0"
            />
          </Link>
        </div>
        <div className="hidden lg:show lg:flex flex-row">
          <div className="flex gap-8 py-5 px-2.5">
            <Link href="/docs">Docs</Link>
            <Link href="/about-us" className="whitespace-nowrap">
              About Us
            </Link>
            <Link href="/community">Community</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/templates">Templates</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/status">Status</Link>
          </div>
        </div>
        <div className="hidden lg:show lg:flex flex-row">
          <div className="flex flex-row gap-4">
            <button className="github-star">
              <div className="flex flex-row py-3 px-4 border-[#242627] border rounded-xl items-center gap-2 bg-black">
                <GithubStar />
                <span className="w-px h-5 opacity-20 bg-gray-100"></span>
                <span className="bg-gradient-white bg-clip-text text-transparent whitespace-nowrap">
                  Star us on
                </span>
                <Image
                  src="/githubLogo.svg"
                  alt="Github Logo"
                  width={20}
                  height={20}
                />
              </div>
            </button>
            <GradientButton>Sign Up</GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}
