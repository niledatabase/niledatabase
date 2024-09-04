import Link from "next/link";

export function Links({ className: cn }: { className?: string }) {
  const className = `whitespace-nowrap text-base leading-5${cn ?? cn}`;
  return (
    <>
      <Link href="/docs" className={className}>
        Docs
      </Link>
      <Link href="/about-us" className={className}>
        About Us
      </Link>
      <Link className={className} href="/community">
        Community
      </Link>
      <Link className={className} href="/blog">
        Blog
      </Link>
      <Link className={className} href="/templates">
        Templates
      </Link>
      <Link className={className} href="/pricing">
        Pricing
      </Link>
    </>
  );
}
