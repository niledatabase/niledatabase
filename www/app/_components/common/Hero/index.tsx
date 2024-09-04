import Image from "next/image";
import arrow from "@/public/icons/arrow.svg";
import AnimatedGradient from "../../AnimatedGradient";
import GradientButton from "../GradientButton";
import TextTyper from "./TextTyper";

export function HeroText() {
  return (
    <div className="px-4 lg:px-0 flex gap-8 flex-col">
      <h1 className="text-[96px] leading-[96px] flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center font-medium">
          Build{" "}
          <div className="gradient-dashed-border relative overflow-hidden py-3 px-6 rounded-[14px]">
            <div className="bg-clip-text text-transparent bg-gradient-text subpixel-antialiased bg-black overflow-hidden whitespace-nowrap leading-[120px]">
              <TextTyper
                words={["Collaborative", "Blazingly Fast", "World Class"]}
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
                width={25}
                height={30}
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
          <div className="p-10 pt-48">
            <div className="text-[48px] leading-[52px] text-black font-semibold">
              Ready to launch?
            </div>
            <div className="text-[48px] leading-[52px] text-black">
              Start building with Postgres.
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
