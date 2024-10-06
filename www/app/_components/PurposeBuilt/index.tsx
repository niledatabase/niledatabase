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
              <div className="text-[16px] leading-[16px] xl:text-[32px] xl:leading-[32px] text-black inline">
                <span className="pr-1 lg:pr-3 shrink-0 inline-flex items-center w-[84px] lg:w-auto">
                  <Image
                    src={Logo}
                    alt="nile logo"
                    width={162}
                    height={60}
                    className="brightness-0 leading-[32px] xl:leading-[64px] translate-y-1 lg:translate-y-2"
                  />
                </span>
                <span>A Postgres database  that enables all database operations at the tenant level, including auto-scaling, branching, backups and insights, with full tenant isolation. Place tenants in any region on serverless or dedicated compute, with the cost and operational efficiency of a single, scalable database.</span>
              </div>
            </div>
          </div>
        </AnimatedGradient>
      </div>
    </div>
  );
}
