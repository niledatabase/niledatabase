import Image from "next/image";
export default function Footer({ className }: { className?: string }) {
  return (
    <div className={`bg-footer bg-no-repeat w-full relative ${className}`}>
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-footer-fade pointer-events-none"></div>
      <div className="z-10 relative">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col gap-3">
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
          <div className="flex flex-row gap-20">
            <div className="flex flex-col gap-5">
              <div className="text-lg">Documentation</div>
              <div className="text-lg opacity-70">Quick Start</div>
              <div className="text-lg opacity-70">Use Cases</div>
              <div className="text-lg opacity-70">Architecture</div>
              <div className="text-lg opacity-70">API</div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-lg">Resources</div>
              <div className="text-lg opacity-70">Blog</div>
              <div className="text-lg opacity-70">Customers</div>
              <div className="text-lg opacity-70">Whitepaper</div>
              <div className="text-lg opacity-70">Changelog</div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-lg">Company</div>
              <div className="text-lg opacity-70">About</div>
              <div className="text-lg opacity-70">Pricing</div>
              <div className="text-lg opacity-70">Terms</div>
              <div className="text-lg opacity-70">Privacy</div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-lg">Support</div>
              <div className="text-lg opacity-70">Contact Sales</div>
              <div className="text-lg opacity-70">Get Help</div>
              <div className="text-lg opacity-70">FAQ</div>
            </div>
          </div>
        </div>
        <div className="mt-40 flex flex-row gap-4 items-center mb-10">
          <div className="bg-[#00B790] w-2 h-2 rounded-md"></div>
          <div className="text-[#A1A1AA]">
            All Systems Operational <span className="text-lg">↗</span>
          </div>
        </div>
      </div>
    </div>
  );
}
