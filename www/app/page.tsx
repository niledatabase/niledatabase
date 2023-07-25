import Image from "next/image";
import Navigation from "./Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-pattern">
      <Navigation />
      <main className="flex flex-col items-center justify-between p-24 relative z-10">
        <h1 className="bg-gradient-text bg-clip-text text-transparent text-7xl leading-normal text-center">
          Serverless Postgres for modern SaaS
        </h1>
        <div className="text-xl opacity-60 font-inter mt-2">
          Build In Days. Scale For Years.
        </div>
        <button className="flex flex-row gap-2 text-lg gradientButton mt-10 font-medium">
          Get Started
          <Image
            src="/arrow.svg"
            alt="get started arrow"
            width={15}
            height={20}
            priority
          />
        </button>
        <div className="flex flex-row items-center justify-between gap-6 mt-28 flex-wrap">
          <div className="flex flex-col gap-3 items-center px-4 py-5 w-56">
            <Image
              src="/multi-tenant.svg"
              alt="built-in multi tenant virtualization icon"
              width={100}
              height={100}
              priority
            />
            <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base w-40">
              Built-in Multi Tenant Virtualization
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center px-4 py-5 w-56">
            <Image
              src="/user-management.svg"
              alt="drop in user management icon"
              width={100}
              height={100}
              priority
            />
            <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base w-40">
              Drop in User Management
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center px-4 py-5 w-56">
            <Image
              src="/distribute-globally.svg"
              alt="Onboard once, Distribute Globally icon"
              width={100}
              height={100}
              priority
            />
            <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base w-40">
              Onboard Once, Distribute Globally
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center px-4 py-5 w-56">
            <Image
              src="/elastic.svg"
              alt=" Effortlessly Elastic icon"
              width={100}
              height={100}
              priority
            />
            <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base w-40">
              Effortlessly Elastic
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center px-4 py-5 w-56">
            <Image
              src="/instant-dashboards.svg"
              alt="Instant Customer Dashboards icon"
              width={100}
              height={100}
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
            height={20}
            priority
          />
        </div>
        <div className="border rounded-2xl border-[#dfeffe24] p-2">
          <Image
            src="/dashboard.svg"
            alt="nile dashboard"
            width={1206}
            height={732}
            priority
          />
        </div>
        <div className="bg-divider h-px w-full mt-32" />
      </main>
    </div>
  );
}
