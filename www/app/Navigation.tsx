import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <div className="flex flex-row items-center justify-between px-28">
      <div className="w-44">
        <Image
          src="/logo.svg"
          alt="Nile Logo"
          width={80}
          height={30}
          priority
        />
      </div>
      <div className="flex gap-8 py-5 px-2.5">
        <Link href="/docs">Docs</Link>
        <Link href="/community">Community</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/status">Status</Link>
      </div>
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
  );
}
