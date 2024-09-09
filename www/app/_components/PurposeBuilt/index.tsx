import Image from "next/image";
import Logo from "@/public/logo.svg";
import AnimatedGradient from "../AnimatedGradient";

export default function PurposeBuilt() {
  return (
    <div className="container mx-auto">
      <div className="w-full mt-20">
        <AnimatedGradient>
          <div className="px-4 py-6 pt-24 lg:px-10 lg:py-10 lg:pt-48">
            <div className="flex gap-3">
              <div className="text-[32px] leading-[32px] lg:text-[64px] lg:leading-[64px] text-black inline w-5/6 lg:w-2/3">
                <span className="pr-1 lg:pr-3 shrink-0 inline-flex items-center w-[84px] lg:w-auto">
                  <Image
                    src={Logo}
                    alt="nile logo"
                    width={162}
                    height={60}
                    className="brightness-0 leading-[64px] translate-y-1 lg:translate-y-2"
                  />
                </span>
                <span>
                  Postgres is purpose-built for multi tenant AI applications.
                </span>
              </div>
            </div>
          </div>
        </AnimatedGradient>
      </div>
    </div>
  );
}
