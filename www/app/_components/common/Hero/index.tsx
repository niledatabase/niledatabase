import Image from "next/image";
import arrow from "@/public/icons/arrow.svg";
import postgresBlack from "@/public/postgres-black.png";
import AnimatedGradient from "../../AnimatedGradient";
import TextTyper from "./TextTyper";

export function HeroText() {
  return (
    <div className="flex gap-8 flex-col">
      <h1 className="text-[42px] leading-[42px] lg:text-[96px] lg:leading-[96px] flex flex-col gap-2">
        <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center font-medium">
          Build{" "}
          <div className="gradient-dashed-border relative overflow-hidden py-3 px-6 rounded-[20px]">
            <div className="bg-clip-text text-transparent bg-gradient-text subpixel-antialiased bg-black overflow-hidden whitespace-nowrap leading-[48px] lg:leading-[120px]">
              <TextTyper
                words={[
                  "Marketing",
                  "Sales",
                  "Legal",
                  "Finance",
                  "Healthcare",
                  "Collaborative",
                  "Support",
                  "Recruiting",
                  "Security",
                  "Hospitality",
                  "Developer",
                  "Education",
                ]}
              />
            </div>
          </div>
        </div>
        <div>B2B apps fast</div>
      </h1>
      <h2 className="text-[24px] leading-[24px] xl:text-[32px] xl:leading-[32px]">
        PostgreSQL re-engineered&nbsp;
        <br className="block md:hidden" />
        for multi-tenant apps &nbsp;
      </h2>
      <div className="flex gap-4 items-center justify-start">
        <a href="https://console.thenile.dev" className="flex">
          <button className="bg-blue text-black transition-colors px-4 py-2 rounded-[10px] flex flex-row gap-2 items-center text-[16px] leading-[20px] h-11">
            Build with Nile
            <Image
              className="-ml-1 invert"
              src={arrow}
              alt="arrow"
              width={16}
              height={16}
            />
          </button>
        </a>
      </div>
    </div>
  );
}

export function HeroBottom({
  cta = (
    <>
      <div className="flex items-center">
        <Image
          src={postgresBlack}
          alt="black postgres logo"
          className="w-7 lg:w-auto"
          height={40}
          width={40}
        />
      </div>
      <div className="text-[24px] leading-[28px] lg:text-[48px] lg:leading-[52px] text-black flex flex-row shrink-0">
        Postgres.
      </div>
    </>
  ),
}: {
  cta?: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <div className="w-full mt-20">
        <AnimatedGradient>
          <div className="px-4 py-6 lg:p-10 lg:pt-48 flex gap-4 flex-col">
            <div className="flex gap-1 flex-col">
              <div className="text-[24px] leading-[28px] lg:text-[48px] lg:leading-[52px] text-black font-semibold">
                Ready to launch?
              </div>
              <div className="text-[24px] leading-[28px] lg:text-[48px] lg:leading-[52px] text-black flex flex-row gap-1 lg:gap-2 items-center">
                <div className="whitespace-nowrap">Start building with</div>
                {cta}
              </div>
            </div>
            <div className="flex gap-4 items-center justify-start">
              <a href="https://console.thenile.dev" className="flex">
                <button className="bg-blue text-black transition-colors px-4 py-2 rounded-[10px] flex flex-row gap-2 items-center text-[16px] leading-[20px] h-11">
                  Build with Nile
                  <Image
                    className="-ml-1 invert"
                    src={arrow}
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                </button>
              </a>
            </div>
          </div>
        </AnimatedGradient>
      </div>
    </div>
  );
}
