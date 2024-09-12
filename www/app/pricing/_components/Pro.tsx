import React from "react";
import Image from "next/image";
import arrow from "@/public/icons/arrow.svg";
import Column from "./Column";
import Link from "next/link";
export default function Pro() {
  return (
    <Column
      tier={"Pro"}
      price={15}
      tierSizzle={"For prototyping or side projects"}
      computeTop="150 million query tokens"
      computeSub="$0.25 per million additional tokens"
      storageTop="5 GB"
      storageSub="$1.00 per additional GB"
      dbBack="1 week"
      connections="10,000"
      sla="99.95%"
      sharing
      branches="50 branches"
      tenantInsights="2 weeks retention"
      emailSla
      startButton={
        <Link
          href="https://console.thenile.dev"
          className="flex w-full justify-center"
        >
          <button className="bg-brightOrange text-black rounded-md lg:w-full flex flex-row px-20 lg:px-5 xl:px-11 justify-center">
            <div className="px-5 py-2.5 flex flex-row items-center justify-center font-semibold">
              Start now
              <Image src={arrow} alt="arrow" className="invert" />
            </div>
          </button>
        </Link>
      }
    />
  );
}
