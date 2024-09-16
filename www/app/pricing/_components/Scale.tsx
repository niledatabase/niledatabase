import React from "react";
import Image from "next/image";
import arrow from "@/public/icons/arrow.svg";
import Column from "./Column";
import Link from "next/link";
export default function Scale() {
  return (
    <Column
      tier={"Scale"}
      price={350}
      tierSizzle={"For scale, more security or global presence"}
      computeTop="500 million query tokens"
      computeSub="$0.04 per million additional tokens"
      storageTop="50 GB"
      storageSub="$0.75 per additional GB"
      dbBack="1 week"
      tenantBack="1 week"
      connections="100,000"
      sla="99.99%"
      sharing
      branches="Unlimited"
      provisionedcompute="upto 8 VCPU"
      globalplacement="5 regions"
      soc2
      tenantInsights="2 months retention"
      emailSla
      designated
      startButton={
        <Link
          href="https://console.thenile.dev"
          className="flex w-full justify-center"
        >
          <button className="bg-brightOrange lg:bg-transparent gradientBorderButton text-black lg:text-[#fff] rounded-md before:opacity-0 lg:before:opacity-100 lg:w-full flex flex-row px-20 lg:px-5 xl:px-11 justify-center">
            <div className="px-5 py-2.5 rounded-md flex flex-row items-center justify-center">
              Start now
              <Image src={arrow} alt="arrow" className="invert lg:invert-0" />
            </div>
          </button>
        </Link>
      }
    />
  );
}
