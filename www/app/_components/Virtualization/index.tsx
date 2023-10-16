import Image from "next/image";
import Heading from "@/app/_components/common/Heading";
import Video from "../Video";
import { sizes } from "../common/sizes";

export default function Virtualization() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-visualization bg-no-repeat bg-[size:200%] md:bg-[size:100%] blur-lg -z-10 bg-[center_top_2rem]"></div>
      <div className="relative pb-10 mt-20">
        <Heading text="Built-in tenant virtualization"></Heading>
      </div>
      <div className="flex flex-col xl:flex-row justify-between mb-20 bg-[#000] rounded-[20px] p-[56px] lg:m-0 md:mx-6">
        <div className="flex gap-8 flex-col lg:pr-6 mb-4">
          <div className="text-[32px] bg-gradient-text bg-clip-text text-transparent leading-normal mb-3 text-center lg:text-left">
            Native tenant data isolation
          </div>
          <div className="flex flex-col lg:flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image src="/icons/lock.svg" alt="lock" width={24} height={25} />
            </div>
            <div className="opacity-60 text-[18px] text-center lg:text-left">
              100% secure with no cross-tenant access
            </div>
          </div>
          <div className="flex  flex-col lg:flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/rls.svg"
                alt="table with lock"
                width={24}
                height={24}
              />
            </div>
            <div className="opacity-60 text-[18px] text-center lg:text-left">
              No more struggle with row level security
            </div>
          </div>
          <div className="flex  flex-col lg:flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/share.svg"
                alt="circles with interconnected dots"
                width={24}
                height={25}
              />
            </div>
            <div className="opacity-60 text-[18px] text-center lg:text-left">
              Securely share data across tenants using shared tables
            </div>
          </div>
        </div>
        <div className="xl:w-[603px] xl:shrink-0">
          <Video src="data-isolation.mp4" poster={"data-isolation.png"} />
        </div>
      </div>
      <div className="flex-row w-full pb-6 hidden lg:flex">
        <div className="w-1/2 px-[20px]">
          <div className="text-[32px] bg-gradient-text bg-clip-text text-transparent leading-normal mb-3">
            Tenant level backups
          </div>
        </div>
        <div className="w-1/2 px-[20px]">
          <div className="text-[32px] bg-gradient-text bg-clip-text text-transparent leading-normal mb-3">
            Performance isolation across tenants
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-around">
        <div className="lg:w-1/2 px-[20px] flex flex-col gap-6">
          <div className="text-[32px] bg-gradient-text bg-clip-text text-transparent leading-normal mb-3 block lg:hidden text-center">
            Tenant level backups
          </div>
          <div className="flex flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/backups.svg"
                alt="lock"
                width={24}
                height={25}
              />
            </div>
            <div className="opacity-60 text-[18px]">
              Instant restoration from backups for your customers
            </div>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/bug.svg"
                alt="table with lock"
                width={24}
                height={24}
              />
            </div>
            <div className="opacity-60 text-[18px]">
              No hacky or buggy scripts to restore specific customers
            </div>
          </div>
          <div className="flex flex-row gap-5 items-center mb-5">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/file.svg"
                alt="circles with interconnected dots"
                width={24}
                height={25}
              />
            </div>
            <div className="opacity-60 text-[18px]">
              Manage different backup strategies per tenant
            </div>
          </div>
          <Image
            src="/video/tenant-backup.gif"
            alt="gif showing data isolation"
            width={672}
            height={258}
          />
        </div>
        <div className="lg:w-1/2 px-[20px] flex flex-col gap-6">
          <div className="text-[32px] bg-gradient-text bg-clip-text text-transparent leading-normal mb-3 block lg:hidden text-center mt-10">
            Performance isolation
            <br /> across tenants
          </div>

          <div className="flex flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/hot-tenant.svg"
                alt="lock"
                width={24}
                height={24}
              />
            </div>
            <div className="opacity-60 text-[18px]">
              Hot tenants have no impact on other tenants
            </div>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                className="scale-[2]"
                src="/icons/performance.svg"
                alt="table with lock"
                width={24}
                height={24}
              />
            </div>
            <div className="opacity-60 text-[18px]">
              Performance insights per tenant
            </div>
          </div>
          <div className="flex flex-row gap-5 items-center mb-5">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                className="scale-[2]"
                src="/icons/metrics.svg"
                alt="circles with interconnected dots"
                width={24}
                height={24}
              />
            </div>
            <div className="opacity-60 text-[18px]">
              Predictable performance for each tenant
            </div>
          </div>
          <Video src="perf-iso.mp4" poster={"perf-iso.png"} />
        </div>
      </div>
    </div>
  );
}
