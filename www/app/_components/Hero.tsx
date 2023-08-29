import { HeroText } from '@/app/_components/common/Hero';
import { sizes } from '@/app/_components/common/sizes';
import Image from 'next/image';

export default function Hero() {
  return (
    <>
      <HeroText />
      <div className="flex flex-row items-center justify-between gap-6 mt-28 flex-wrap">
        <div className="flex flex-col gap-3 items-center px-4 py-5 w-56">
          <Image
            src="/multi-tenant.jpg"
            alt="built-in multi tenant virtualization icon"
            width={100}
            height={100}
            sizes={sizes}
            priority
          />
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base w-40">
            Built-in Multi Tenant Virtualization
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center px-4 py-5 w-56">
          <Image
            src="/user-management.jpg"
            alt="drop in user management icon"
            width={100}
            height={100}
            sizes={sizes}
            priority
          />
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base w-40">
            Drop in User Management
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center px-4 py-5 w-56">
          <Image
            src="/distribute-globally.jpg"
            alt="Onboard once, Distribute Globally icon"
            width={100}
            height={100}
            sizes={sizes}
            priority
          />
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base w-40">
            Onboard Once, Distribute Globally
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center px-4 py-5 w-56">
          <Image
            src="/elastic.jpg"
            alt=" Effortlessly Elastic icon"
            width={100}
            height={100}
            sizes={sizes}
            priority
          />
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base w-20">
            Effortlessly Elastic
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center px-4 py-5 w-56">
          <Image
            src="/instant-dashboards.jpg"
            alt="Instant Customer Dashboards icon"
            width={100}
            height={100}
            sizes={sizes}
            priority
          />
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base w-40">
            Instant Customer Dashboards
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
