import Image from "next/image";
import Link from "next/link";
import arrow from "@/public/icons/arrow.svg";
import { HeroText } from "./common/Hero";

export default function Hero() {
  return (
    <div className="container mx-auto">
      <div className="sm:px-4 py-32 pb-10 xl:px-24 xl:py-48 md:px-12 md:py-24">
        <div className="flex gap-8 flex-col">
          <div className="flex justify-start">
            <Link
              href="https://www.thenile.dev/blog/introducing-nile-auth"
              className="flex flex-row relative"
            >
              <div className="bg-gray hover:bg-lightGray transition-colors text-center p-2 w-full leading-[20px] text-[16px] flex flex-row gap-2 items-center justify-center text-[#fff] rounded-[10px] px-4 py-2">
                <span>
                  Introducing Nile Auth <span>Learn more</span>
                </span>
                <Image
                  className="-ml-1"
                  src={arrow}
                  alt="arrow"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
          </div>
          <HeroText />
        </div>
      </div>
    </div>
  );
}
