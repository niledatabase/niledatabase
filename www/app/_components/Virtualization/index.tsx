'use client';
import Image from 'next/image';
import Videos from './Videos';
import { useEffect, useRef, useState } from 'react';
import useScroll from './useScroll';
import useIntersection from '@/app/_components/common/useIntersection';
import Texts from './Texts';
import Heading from '@/app/_components/common/Heading';
import Video from '../Video';

export default function Virtualization() {
  return (
    <div className="relative">
      <Image
        className="absolute top-0 left-0 right-0 -z-10 w-full scale-x-125 blur-lg"
        src="/virtualization.svg"
        alt="orange and green blurred gradient"
        width={1440}
        height={744}
      />

      <div className="relative pb-10 mt-20">
        <Heading text="Built-in Tenant virtualization"></Heading>
      </div>
      <div className="flex flex-row justify-around mb-20 bg-[#000] rounded-[20px] p-[56px]">
        <div className="max-w-[400px] flex gap-8 flex-col">
          <div className="text-[32px] bg-gradient-text bg-clip-text text-transparent leading-normal mb-3">
            Native tenant data isolation
          </div>
          <div className="flex flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image src="/icons/lock.svg" alt="lock" width={24} height={24} />
            </div>
            <div className="opacity-60 text-[18px]">
              100% secure with no cross tenant access
            </div>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/rls.svg"
                alt="table with lock"
                width={24}
                height={24}
              />
            </div>
            <div className="opacity-60 text-[18px]">
              No more struggle with row level security
            </div>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/share.svg"
                alt="circles with interconnected dots"
                width={24}
                height={24}
              />
            </div>
            <div className="opacity-60 text-[18px]">
              Securely share data across tenants using shared tables
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <Video src="data-isolation.mp4" poster={'data-isolation.png'} />
        </div>
      </div>
      <div className="flex flex-row w-full pb-6">
        <div className="w-1/2 px-[20px]">
          <div className="text-[32px] bg-gradient-text bg-clip-text text-transparent leading-normal mb-3">
            Tenant Level Backups
          </div>
        </div>
        <div className="w-1/2 px-[20px]">
          <div className="text-[32px] bg-gradient-text bg-clip-text text-transparent leading-normal mb-3">
            Performance Isolation Across Tenants
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-around">
        <div className="w-1/2 px-[20px] flex flex-col gap-6">
          <div className="flex flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image src="/icons/lock.svg" alt="lock" width={24} height={24} />
            </div>
            <div className="opacity-60 text-[18px]">
              Instant restoration from backups for your customers
            </div>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/rls.svg"
                alt="table with lock"
                width={24}
                height={24}
              />
            </div>
            <div className="opacity-60 text-[18px]">
              No hacky or buggy scripts to restore specific customers
            </div>
          </div>
          <div className="flex flex-row gap-5 items-center mb-5">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/share.svg"
                alt="circles with interconnected dots"
                width={24}
                height={24}
              />
            </div>
            <div className="opacity-60 text-[18px]">
              Manage different backup strategies per tenant
            </div>
          </div>
          <Image
            src="/video/tenant-backup.gif"
            alt="gif showing data isolation"
            width={672}
            height={258}
          />
        </div>
        <div className="w-1/2 px-[20px] flex flex-col gap-6">
          <div className="flex flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image src="/icons/lock.svg" alt="lock" width={24} height={24} />
            </div>
            <div className="opacity-60 text-[18px]">
              Hot tenants have no impact on other tenants
            </div>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/rls.svg"
                alt="table with lock"
                width={24}
                height={24}
              />
            </div>
            <div className="opacity-60 text-[18px]">
              Performance insights per tenant
            </div>
          </div>
          <div className="flex flex-row gap-5 items-center mb-5">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/share.svg"
                alt="circles with interconnected dots"
                width={24}
                height={24}
              />
            </div>
            <div className="opacity-60 text-[18px]">
              Predictable performance for each tenant
            </div>
          </div>
          <Video src="perf-iso.mp4" poster={'perf-iso.png'} />
        </div>
      </div>
    </div>
  );
}
