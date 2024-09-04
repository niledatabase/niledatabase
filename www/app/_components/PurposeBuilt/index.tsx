import Image from "next/image";
import Logo from "@/public/logo.svg";
import AnimatedGradient from "../AnimatedGradient";

export default function PurposeBuilt() {
  return (
    <div className="container mx-auto">
      <div className="w-full mt-20">
        <AnimatedGradient>
          <div className="p-10 pt-48">
            <div className="flex gap-3">
              <Image
                src={Logo}
                alt="nile logo"
                width={162}
                height={60}
                className="brightness-0"
              />
              <div className="text-[64px] leading-[64px] text-black">
                Postgres is purpose-built
              </div>
            </div>
            <div className="text-[64px] leading-[64px] text-black">
              for multi tenant AI applications.
            </div>
          </div>
        </AnimatedGradient>
      </div>
    </div>
  );
}
