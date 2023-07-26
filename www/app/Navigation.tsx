"use client";
import Link from "next/link";
import Image from "next/image";
import "./storeScroll";

export default function Navigation() {
  return (
    <div className={`navBlur flex flex-row flex-1 w-full sticky top-0 z-50`}>
      <div className="flex lg:hidden">Menu</div>
      <div className="flex flex-row items-center justify-between px-28 flex-1">
        <div className="w-full items-center flex lg:block lg:items-start lg:w-44 ">
          <Image
            src="/logo.svg"
            alt="Nile Logo"
            width={80}
            height={30}
            priority
            className="m-auto scale-[2.1] translate-y-6 lg:m-0 lg:scale-100 lg:translate-y-0"
          />
        </div>
        <div className="hidden lg:show lg:flex flex-row">
          <div className="flex gap-8 py-5 px-2.5">
            <Link href="/docs">Docs</Link>
            <Link href="/community">Community</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/status">Status</Link>
          </div>
        </div>
        <div className="hidden lg:show lg:flex flex-row">
          <div className="flex flex-row gap-4">
            <div className="flex flex-row py-3 px-4 border-gray-800 border rounded-xl items-center gap-2 bg-black">
              <Image
                src="/githubStar.svg"
                alt="github star"
                width={21}
                height={20}
                priority
              />
              <span className="w-px h-5 opacity-20 bg-gray-100"></span>
              <span className="bg-gradient-white bg-clip-text text-transparent">
                Star us on
              </span>
              <Image
                src="/githubLogo.svg"
                alt="Github Logo"
                width={20}
                height={20}
                priority
              />
            </div>
            <div className="bg-gradient-text-144 py-3 px-4 bg-clip-text text-transparent gradientBorderButton subpixel-antialiased">
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
