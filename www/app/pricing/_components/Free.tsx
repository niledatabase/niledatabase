import React from 'react';
import Image from 'next/image';
import arrow from '@/public/icons/arrow.svg';
import Column from './Column';
import Link from 'next/link';
export default function Free() {
  return (
    <Column
      tier={'Free'}
      price={0}
      tierSizzle={
        'For prototyping or side projects. No pauses, always available'
      }
      computeTop="50 million query tokens"
      computeSub="$0.06 per million additional tokens"
      storageTop="1 GB"
      storageSub="$1.50 per additional GB"
      connections="500"
      branches="One branch"
      globalplacement="One region"
      tenantInsights="1 day retention"
      tenantOverrides={true}
      enterpriseSaml={false}
      mfa={false}
      startButton={
        <Link
          href="https://console.thenile.dev"
          className="flex w-full justify-center"
        >
          <button className="gradientBorderButton flex flex-row justify-center rounded-md bg-brightOrange px-20 text-black before:opacity-0 lg:w-full lg:bg-transparent lg:px-5 lg:text-[#fff] lg:before:opacity-100 xl:px-11">
            <div className="flex flex-row items-center justify-center rounded-md px-5 py-2.5">
              Start now
              <Image src={arrow} alt="arrow" className="invert lg:invert-0" />
            </div>
          </button>
        </Link>
      }
    />
  );
}
