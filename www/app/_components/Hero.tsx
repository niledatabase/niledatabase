import { HeroText } from '@/app/_components/common/Hero';
import { sizes } from '@/app/_components/common/sizes';
import Image from 'next/image';

export default function Hero() {
  return (
    <>
      <HeroText />
      <div className="flex flex-row items-center justify-between gap-6 mt-28 w-full flex-wrap lg:flex-nowrap">
        <div className="flex flex-col gap-3 items-center px-4 py-5">
          <Image
            src="/multi-tenant.jpg"
            alt="built-in multi tenant virtualization icon"
            width={100}
            height={100}
            sizes={sizes}
            priority
          />
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base whitespace-nowrap">
            Built-in Multi <br />
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
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base  whitespace-nowrap">
            Drop in User <br />
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
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base  whitespace-nowrap">
            Onboard Once,
            <br /> Distribute Globally
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
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base  whitespace-nowrap">
            Effortlessly <br />
            Elastic
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
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base  whitespace-nowrap">
            Instant Customer <br />
            Dashboards
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-1.5 py-10">
        <span className="bg-gradient-white bg-clip-text text-transparent">
          Backed by
        </span>
        <Image
          src="/benchmark.svg"
          alt="benchmark logo"
          width={114}
          height={21}
          priority
          className="opacity-50"
        />
      </div>
    </>
  );
}
