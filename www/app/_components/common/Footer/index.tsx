import Image from "next/image";
import Status from "./Status";
import Link from "next/link";
export default async function Footer({ className }: { className?: string }) {
  return (
    <div
      className={`bg-footer bg-no-repeat w-full relative ${
        className ?? ""
      } mt-24`}
    >
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-footer-fade pointer-events-none"></div>
      <div className="z-10 relative">
        <div className="flex flex-col lg:flex-row  justify-between w-full gap-32">
          <div className="flex flex-col gap-3 items-center lg:items-start">
            <Image src="/logo.svg" alt="nile logo" width={62} height={22} />
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
          <div className="flex flex-row flex-wrap gap-20">
            <div className="flex flex-col gap-5">
              <Link href="/docs" className="text-[16px]">
                Documentation
              </Link>
              <Link
                href="/docs/getting-started"
                className="text-[16px] opacity-70"
              >
                Quick Start
              </Link>
              <div className="text-[16px] opacity-70">Use Cases</div>
              <div className="text-[16px] opacity-70">Architecture</div>
              <div className="text-[16px] opacity-70">API</div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-[16px]">Resources</div>
              <Link href="/blog" className="text-[16px] opacity-70">
                Blog
              </Link>
              <div className="text-[16px] opacity-70">Customers</div>
              <div className="text-[16px] opacity-70">Whitepaper</div>
              <div className="text-[16px] opacity-70">Changelog</div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-[16px]">Company</div>
              <Link href="/about-us" className="text-[16px] opacity-70">
                About
              </Link>
              <div className="text-[16px] opacity-70">Pricing</div>
              <div className="text-[16px] opacity-70">Terms</div>
              <div className="text-[16px] opacity-70">Privacy</div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-[16px]">Support</div>
              <div className="text-[16px] opacity-70">Contact Sales</div>
              <div className="text-[16px] opacity-70">Get Help</div>
              <div className="text-[16px] opacity-70">FAQ</div>
            </div>
          </div>
        </div>
        <Status />
      </div>
    </div>
  );
}
