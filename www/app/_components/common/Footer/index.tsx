import Image from "next/image";
import Status from "./Status";
import Link from "next/link";
export default async function Footer({ className }: { className?: string }) {
  return (
    <div
      className={`bg-footer bg-no-repeat w-full relative bg-[bottom] ${
        className ?? ""
      } mt-24`}
    >
      <div className="container mx-auto">
        <div className="md:px-4 md:py-4 pb-0 2xl:px-24 2xl:py-4">
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-footer-fade pointer-events-none"></div>
          <div className="z-10 relative">
            <div className="flex flex-col lg:flex-row  justify-between w-full gap-32">
              <div className="flex flex-col gap-3 items-center lg:items-start">
                <Image src="/logo.svg" alt="nile logo" width={80} height={30} />
                <div className="text-[#A1A1AA] text-lg">
                  Copyright &copy; {new Date().getFullYear()} Nile
                </div>
                <div className="flex flex-row gap-5">
                  <Image
                    src="/icons/twitter.svg"
                    alt="twitter logo"
                    width={15}
                    height={14}
                  />
                  <Image
                    src="/icons/facebook.svg"
                    alt="facebook logo"
                    width={15}
                    height={14}
                  />
                  <Image
                    src="/icons/linkedin.svg"
                    alt="linkedin logo"
                    width={15}
                    height={14}
                  />
                  <Image
                    src="/icons/youtube.svg"
                    alt="youtube logo"
                    width={15}
                    height={14}
                  />
                </div>
              </div>
              <div className="flex flex-row flex-wrap gap-20 p-2">
                <div className="flex flex-col gap-5">
                  <Link href="/docs" className="text-[16px] opacity-70">
                    Documentation
                  </Link>
                  <Link
                    href="/docs/getting-started"
                    className="text-[16px] opacity-70"
                  >
                    Quick Start
                  </Link>
                </div>
                <div className="flex flex-col gap-5">
                  <Link href="/blog" className="text-[16px] opacity-70">
                    Blog
                  </Link>
                </div>
                <div className="flex flex-col gap-5">
                  <Link href="/about-us" className="text-[16px] opacity-70">
                    About
                  </Link>
                  <Link href="/pricing" className="text-[16px] opacity-70">
                    Pricing
                  </Link>
                </div>
                <div className="flex flex-col gap-5">
                  <Link href="/contact-us" className="text-[16px] opacity-70">
                    Contact Sales
                  </Link>
                  <Link href="/pricing#faq" className="text-[16px] opacity-70">
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
            <Status />
          </div>
        </div>
      </div>
    </div>
  );
}
