import Image from "next/image";
import arrow from "@/public/icons/arrow.svg";
import postgresBlack from "@/public/postgres-black.png";
import AnimatedGradient from "../../AnimatedGradient";
import GradientButton from "../GradientButton";
import TextTyper from "./TextTyper";

export function HeroText() {
  return (
    <div className="flex gap-8 flex-col">
      <h1 className="text-[42px] leading-[42px] lg:text-[96px] lg:leading-[96px] flex flex-col gap-2">
        <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center font-medium">
          Build{" "}
          <div className="gradient-dashed-border relative overflow-hidden py-3 px-6 rounded-[14px]">
            <div className="bg-clip-text text-transparent bg-gradient-text subpixel-antialiased bg-black overflow-hidden whitespace-nowrap leading-[42px] lg:leading-[120px]">
              <TextTyper
                words={["Marketing", "Sales", "Legal", "Finance", "Healthcare", "Collaborative", "Support", "Recruiting", "Security", "Hospitality", "Developer", "Education"]}
              />
            </div>
          </div>
        </div>
        <div>AI apps fast</div>
      </h1>
      <h2 className="text-[20px] leading-6">
        A Postgres platform that decouples storage from compute and virtualizes
        <br />
        tenants to ship multi-tenant AI applications - fast, safe, and limitless
      </h2>
      <div className="flex gap-4 items-center justify-start">
        <div>
          <GradientButton subclasses="!p-[1px]">
            <div className="bg-blue text-black px-4 py-2 rounded-md flex flex-row gap-2 items-center">
              Build with Nile
              <Image
                className="-ml-1 invert"
                src={arrow}
                alt="arrow"
                width={16}
                height={16}
              />
            </div>
          </GradientButton>
        </div>
      </div>
    </div>
  );
}

export function HeroBottom() {
  return (
    <div className="container mx-auto">
      <div className="w-full mt-20">
        <AnimatedGradient>
          <div className="px-4 py-6 lg:p-10 lg:pt-48">
            <div className="text-[24px] leading-[28px] lg:text-[48px] lg:leading-[52px] text-black font-semibold">
              Ready to launch?
            </div>
            <div className="text-[24px] leading-[28px] lg:text-[48px] lg:leading-[52px] text-black flex flex-row gap-1 lg:gap-2">
              <div className="whitespace-nowrap">Start building with</div>
              <div className="flex items-center">
                <Image
                  src={postgresBlack}
                  alt="black postgres logo"
                  height={40}
                  width={40}
                />
              </div>
              <div className="text-[24px] leading-[28px] lg:text-[48px] lg:leading-[52px] text-black flex flex-row shrink-0">
                Postgres.
              </div>
            </div>
            <div className="flex gap-4 items-center justify-start">
              <div>
                <GradientButton subclasses="!p-[1px]">
                  <div className="bg-blue text-black px-4 py-2 rounded-md flex flex-row gap-2 items-center">
                    Build with Nile
                    <Image
                      className="-ml-1 invert"
                      src={arrow}
                      alt="arrow"
                      width={25}
                      height={30}
                    />
                  </div>
                </GradientButton>
              </div>
            </div>
          </div>
        </AnimatedGradient>
      </div>
    </div>
  );
}
