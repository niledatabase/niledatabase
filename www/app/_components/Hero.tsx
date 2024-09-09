import { sizes } from "@/app/_components/common/sizes";
import Image from "next/image";
import GradientButton from "./common/GradientButton";
import Link from "next/link";
import multiTenant from "@/public/multi-tenant.png";
import userManagement from "@/public/user-management.png";
import distributeGlobally from "@/public/distribute-globally.png";
import instantCustomerDashboards from "@/public/instant-dashboards.png";
import artificialIntelligence from "@/public/artificial-intelligence.png";
import elastic from "@/public/elastic-button.png";
import benchmark from "@/public/benchmark.svg";
import arrow from "@/public/icons/arrow.svg";
import { HeroText } from "./common/Hero";

export default function Hero() {
  return (
    <div className="container mx-auto">
      <div className="md:px-4 md:py-4 pb-0 2xl:px-24 2xl:py-48">
        <div className="flex gap-8 flex-col">
          <div className="flex justify-start">
            <Link
              href="https://www.thenile.dev/blog/introducing-nile"
              className="flex flex-row relative"
            >
              <div className="bg-gray text-center p-2 w-full leading-[16px] text-[16px] flex flex-row gap-2 items-center justify-center text-white rounded-md px-4 py-2">
                <span>
                  Nile is in private beta.{" "}
                  <span className="underline">Learn more</span>
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
