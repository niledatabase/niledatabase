import { HeroText } from "@/app/_components/common/Hero";
import { sizes } from "@/app/_components/common/sizes";
import Image from "next/image";
import GradientButton from "./common/GradientButton";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="flex justify-center mb-5">
        <Link
          href="/blog/launch"
          className="flex flex-row hover:opacity-70 relative"
        >
          <GradientButton
            variant="launch"
            subclasses="!rounded-[30px] !py-0 !px-2 before:rounded-[30px] launch"
            className="!rounded-[30px] bg-opacity-70"
          >
            <div className="">
              <div className="text-center p-2 w-full text-[14px] flex flex-row gap-1 items-center justify-center text-white">
                Nile is in private beta.{" "}
                <span className="underline">Learn more</span>
                <Image
                  className="-ml-1"
                  src="/icons/arrow.svg"
                  alt="arrow"
                  width={25}
                  height={30}
                  priority
                />
              </div>
            </div>
          </GradientButton>
          <div className="absolute top-0 left-0 right-0 bottom-[12px] bg-divider-glow w-full z-10 pointer-events-none"></div>
        </Link>
      </div>
      <HeroText />
      <div className="flex flex-row items-center mt-28 w-full flex-wrap xl:flex-nowrap justify-around lg:justify-center">
        <div className="flex flex-col md:flex-row flex-1 justify-center items-center">
          <div className="flex flex-col gap-3 items-center px-4 py-5 w-[220px]">
            <Image
              src="/multi-tenant.jpg"
              alt="built-in tenant virtualization icon"
              width={100}
              height={100}
              sizes={sizes}
            />
            <div className="opacity-80 bg-clip-text text-center text-base whitespace-nowrap">
              Built-In Tenant <br />
              Virtualization
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center px-4 py-5  w-[220px]">
            <Image
              src="/user-management.jpg"
              alt="drop in user management icon"
              width={100}
              height={100}
              sizes={sizes}
            />
            <div className="opacity-80 bg-clip-text text-center text-base  whitespace-nowrap">
              Drop-In User <br />
              Management
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center px-4 py-5  w-[220px]">
            <Image
              src="/distribute-globally.jpg"
              alt="Onboard once, Distribute Globally icon"
              width={100}
              height={100}
              sizes={sizes}
            />
            <div className="opacity-80 bg-clip-text text-center text-base  whitespace-nowrap">
              Onboard Tenants Once,
              <br /> Place Globally
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-1 justify-center items-center">
          <div className="flex flex-col gap-3 items-center px-4 py-5 w-[220px]">
            <Image
              src="/instant-dashboards.jpg"
              alt="Instant Customer Dashboards icon"
              width={100}
              height={100}
              sizes={sizes}
            />
            <div className="opacity-80 bg-clip-text text-center text-base  whitespace-nowrap">
              Instant Customer <br />
              Dashboards
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center px-4 py-5  w-[220px]">
            <Image
              src="/artificial-intelligence.jpg"
              alt="Instant Customer Dashboards icon"
              width={100}
              height={100}
              sizes={sizes}
            />
            <div className="opacity-80 bg-clip-text text-center text-base">
              Seamless Tenant-Aware <br />
              AI-Native Applications
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center px-4 py-5 w-[220px] ">
            <Image
              src="/elastic.jpg"
              alt=" Effortlessly Elastic icon"
              width={100}
              height={100}
              sizes={sizes}
            />
            <div className="opacity-80 bg-clip-text text-center text-base">
              Effortlessly <br />
              Elastic
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-1.5 py-10">
        <span className="opacity-0 bg-gradient-white bg-clip-text text-transparent">
          Backed by
        </span>
        <Image
          src="/benchmark.svg"
          alt="benchmark logo"
          width={114}
          height={21}
          className="opacity-0"
        />
      </div>
    </>
  );
}
