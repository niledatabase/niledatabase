import Image from 'next/image';
import Status from './Status';
import Link from 'next/link';
import X from '@/public/x-white.svg';
import LinkedIn from '@/public/linkedin.svg';
import Github from '@/public/githubLogo-white.svg';
import Discord from '@/public/discord-mark-white.svg';
import Logo from '@/public/logo.svg';
export default async function Footer({ className }: { className?: string }) {
  return (
    <div
      className={`relative w-full bg-[bottom] ${className ?? ''} mb-4 mt-24`}
    >
      <div className="container mx-auto">
        <div className="relative z-10">
          <div className="flex w-full flex-col justify-between gap-32 lg:flex-row">
            <div className="flex flex-row flex-wrap gap-16">
              <div className="flex flex-col gap-4">
                <Link href="/docs" className="mb-3 text-[16px] font-medium">
                  Documentation
                </Link>
                <Link href="/docs/getting-started" className="text-[16px]">
                  Quick Start
                </Link>
                <Link
                  href="/docs/getting-started/usecases"
                  className="text-[16px]"
                >
                  Use cases
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <div className="mb-3 text-[16px] font-medium">Resources</div>

                <Link href="/blog" className="text-[16px]">
                  Blog
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <div className="mb-3 text-[16px] font-medium">Company</div>
                <Link href="/about-us" className="text-[16px]">
                  About
                </Link>
                <Link href="/about-us#careers" className="text-[16px]">
                  Careers
                </Link>
                <Link href="/pricing" className="text-[16px]">
                  Pricing
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <div className="mb-3 text-[16px] font-medium">Support</div>
                <Link href="/contact-us" className="text-[16px]">
                  Contact Sales
                </Link>
                <Link href="/contact-us" className="text-[16px]">
                  Get help
                </Link>

                <Link href="/pricing#faq" className="text-[16px]">
                  FAQ
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="mb-3 text-[16px] font-medium">Social</div>
              <div className="text-[16px]">
                <Link
                  href="https://www.linkedin.com/company/niledatabase/"
                  target="_blank"
                  className="flex flex-row items-center gap-3"
                >
                  <Image
                    data-image-zoom-disabled
                    src={LinkedIn}
                    alt="linkedin logo"
                    width={16}
                    height={16}
                  />
                  LinkedIn
                </Link>
              </div>
              <div className="text-[16px]">
                <Link
                  href="https://github.com/niledatabase/niledatabase"
                  target="_blank"
                  className="flex flex-row items-center gap-3"
                >
                  <Image
                    src={Github}
                    data-image-zoom-disabled
                    alt="github octocat"
                    width={15}
                    height={14}
                  />
                  Github
                </Link>
              </div>
              <div className="flex flex-row items-center gap-3 text-[16px]">
                <Link
                  href="https://x.com/niledatabase"
                  target="_blank"
                  className="flex flex-row items-center gap-3"
                >
                  <Image
                    src={X}
                    alt="twitter logo"
                    width={15}
                    height={14}
                    data-image-zoom-disabled
                  />
                  X (twitter)
                </Link>
              </div>
              <div className="flex flex-row items-center gap-3 text-[16px]">
                <Link
                  href="https://discord.gg/8UuBB84tTy"
                  target="_blank"
                  className="flex flex-row items-center gap-3"
                >
                  <Image
                    src={Discord}
                    alt="twitter logo"
                    width={15}
                    height={14}
                    data-image-zoom-disabled
                  />
                  Discord
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <Image
                src={Logo}
                alt="nile logo"
                width={80}
                height={30}
                data-image-zoom-disabled
              />
              <div className="flex flex-row gap-1 text-[12px] opacity-40">
                <Link href="/privacy-policy">Privacy policy</Link>|
                <Link href="/cookie-policy">Cookie policy</Link>
              </div>
              <div className="flex flex-row gap-5"></div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <Status />
            <div className="text-[#A1A1AA]">
              Copyright &copy; {new Date().getFullYear()} Nile
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
