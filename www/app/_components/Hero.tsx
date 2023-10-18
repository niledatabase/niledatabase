import { HeroText } from "@/app/_components/common/Hero";
import { sizes } from "@/app/_components/common/sizes";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <HeroText />
      <div className="flex flex-row items-center lg:space-between gap-6 mt-28 w-full flex-wrap xl:flex-nowrap justify-around">
        <div className="flex flex-col gap-3 items-center px-4 py-5">
          <Image
            src="/multi-tenant.jpg"
            alt="built-in multi tenant virtualization icon"
            width={100}
            height={100}
            sizes={sizes}
            priority
          />
          <div className="opacity-80 bg-clip-text text-center text-base whitespace-nowrap">
            Built-In Multi <br />
            Tenant Virtualization
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center px-4 py-5">
          <Image
            src="/user-management.jpg"
            alt="drop in user management icon"
            width={100}
            height={100}
            sizes={sizes}
            priority
          />
          <div className="opacity-80 bg-clip-text text-center text-base  whitespace-nowrap">
            Drop-In User <br />
            Management
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center px-4 py-5">
          <Image
            src="/distribute-globally.jpg"
            alt="Onboard once, Distribute Globally icon"
            width={100}
            height={100}
            sizes={sizes}
            priority
          />
          <div className="opacity-80 bg-clip-text text-center text-base  whitespace-nowrap">
            Onboard Tenants Once,
            <br /> Place Globally
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center px-4 py-5 ">
          <Image
            src="/instant-dashboards.jpg"
            alt="Instant Customer Dashboards icon"
            width={100}
            height={100}
            sizes={sizes}
            priority
          />
          <div className="opacity-80 bg-clip-text text-center text-base  whitespace-nowrap">
            Instant Customer <br />
            Dashboards
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center px-4 py-5 ">
          <Image
            src="/artificial-intelligence.jpg"
            alt="Instant Customer Dashboards icon"
            width={100}
            height={100}
            sizes={sizes}
            priority
          />
          <div className="opacity-80 bg-clip-text text-center text-base  whitespace-nowrap">
            Seamless Tenant-Aware <br />
            AI-Native Applications
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center px-4 py-5 ">
          <Image
            src="/elastic.jpg"
            alt=" Effortlessly Elastic icon"
            width={100}
            height={100}
            sizes={sizes}
            priority
          />
          <div className="opacity-80 bg-clip-text text-center text-base  whitespace-nowrap">
            Effortlessly <br />
            Elastic
          </div>
        </div>
      </div>
    </>
  );
}
