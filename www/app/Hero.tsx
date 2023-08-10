import Image from "next/image";
const sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
function HeroText() {
  return (
    <>
      <h1 className="bg-gradient-text bg-clip-text text-transparent leading-normal text-center text-[64px]">
        Serverless Postgres for modern SaaS
      </h1>
      <div className="text-xl opacity-60 font-inter mt-2 text-center">
        Build In Days. Scale For Years.
      </div>
      <div className="flex place-content-center">
        <button className="flex flex-row gap-2 text-lg gradientButton mt-10 font-medium">
          Get Started
          <Image
            src="/arrow.svg"
            alt="get started arrow"
            width={15}
            height={20}
            sizes={sizes}
            priority
          />
        </button>
      </div>
    </>
  );
}
export function HeroBottom() {
  return (
    <div className={"w-[784px] flex flex-col place-content-center"}>
      <HeroText />
    </div>
  );
}
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
