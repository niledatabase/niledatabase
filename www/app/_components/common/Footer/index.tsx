import Image from "next/image";
import Status from "./Status";
import Link from "next/link";
import X from "@/public/x-white.svg";
import LinkedIn from "@/public/linkedin.svg";
import Github from "@/public/githubLogo-white.svg";
import Logo from "@/public/logo.svg";
export default async function Footer({ className }: { className?: string }) {
  return (
    <div
      className={`w-full relative bg-[bottom] ${className ?? ""} mt-24 mb-4`}
    >
      <div className="container mx-auto">
        <div className="z-10 relative">
          <div className="flex flex-col lg:flex-row  justify-between w-full gap-32">
            <div className="flex flex-row flex-wrap gap-20">
              <div className="flex flex-col gap-4">
                <Link href="/docs" className="text-[16px] ">
                  Documentation
                </Link>
                <Link href="/docs/getting-started" className="text-[16px] ">
                  Quick Start
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <Link href="/blog" className="text-[16px] ">
                  Blog
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <Link href="/about-us" className="text-[16px] ">
                  About
                </Link>
                <Link href="/about-us#careers" className="text-[16px] ">
                  Careers
                </Link>
                <Link href="/pricing" className="text-[16px] ">
                  Pricing
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <Link href="/contact-us" className="text-[16px] ">
                  Contact Sales
                </Link>
                <Link href="/pricing#faq" className="text-[16px] ">
                  FAQ
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-start lg:items-end">
              <Image src={Logo} alt="nile logo" width={80} height={30} />

              <div className=" flex flex-row gap-1">
                <Link href="/privacy-policy">Privacy policy</Link>|
                <Link href="/cookie-policy">Cookie policy</Link>
              </div>
              <div className="flex flex-row gap-5">
                <Link href="https://x.com/niledatabase" target="_blank">
                  <Image src={X} alt="twitter logo" width={15} height={14} />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/niledatabase/"
                  target="_blank"
                >
                  <Image
                    src={LinkedIn}
                    alt="linkedin logo"
                    width={15}
                    height={14}
                  />
                </Link>
                <Link
                  href="https://github.com/niledatabase/niledatabase"
                  target="_blank"
                >
                  <Image
                    src={Github}
                    alt="github octocat"
                    width={15}
                    height={14}
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-4">
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
