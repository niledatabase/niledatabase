import Link from "next/link";

export function Links({ className: cn }: { className?: string }) {
  const className = `whitespace-nowrap text-[16px] leading-[20px] rounded-[10px] hover:bg-[#1C1C1C] px-4 py-2 ${
    cn ? cn : ""
  }`;
  return (
    <>
      <Link href="/docs" className={className}>
        Docs
      </Link>
      <Link className={className} href="/pricing">
        Pricing
      </Link>
      <Link className={className} href="/templates">
        Templates
      </Link>

      <Link className={className} href="/blog">
        Blog
      </Link>
      <Link className={className} href="/community">
        Community
      </Link>
      <Link href="/about-us" className={className}>
        About
      </Link>
    </>
  );
}
