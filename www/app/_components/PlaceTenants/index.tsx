'use client';
import Image from 'next/image';
import { Block } from '../block';
import user from '@/public/icons/user.svg';
import BgHoverer from './BgHoverer';
import { NewHeading } from '../common/NewHeading';

type Props = {
  tenant1: string;
  tenant2: string;
  tenant3: string;
  region: string;
  country: string;
};
function UserRow({ country }: { country: string }) {
  return (
    <div className="flex w-1/2 items-center justify-center">
      <div className="mt-6 flex flex-row items-center gap-2 rounded-[100px] bg-white bg-opacity-20 px-4 py-2">
        <Image alt="user icon" src={user} />
        <div className="leading=[14px] leading=[14px] text-[10px] lg:text-[14px]">
          USER IN {country}
        </div>
      </div>
    </div>
  );
}
function TenantList({
  tenant1,
  tenant2,
  tenant3,
}: {
  tenant1: string;
  tenant2: string;
  tenant3: string;
}) {
  return (
    <div className="gradientborder flex w-full flex-row gap-1 border bg-white bg-opacity-10 sm:gap-3 xl:gap-6">
      <div className="w-1/2">
        <div className="p-1 pr-0 sm:p-3 xl:p-6">
          <div className="gradientborder flex flex-row items-center justify-between border bg-white bg-opacity-5 px-2 py-[10px] leading-[16.5px]">
            <div className="leading=[14px] leading=[14px] text-[10px] md:text-[14px]">
              Tenant
            </div>
            <div className="leading=[14px] leading=[14px] text-[10px] opacity-60 md:text-[14px]">
              {tenant1}
            </div>
          </div>
          <div className="gradientborder -mt-px flex flex-row items-center justify-between border bg-white bg-opacity-5 px-2 py-[10px] leading-[16.5px]">
            <div className="leading=[14px] leading=[14px] text-[10px] md:text-[14px]">
              Tenant
            </div>
            <div className="leading=[14px] leading=[14px] text-[10px] opacity-60 md:text-[14px]">
              {tenant2}
            </div>
          </div>
          <div className="gradientborder -mt-px flex flex-row items-center justify-between border bg-white bg-opacity-5 bg-gradient-box px-2 py-[10px] leading-[16.5px] tracking-[0.14px] text-black">
            <div className="leading=[14px] leading=[14px] font-sans text-[10px] font-semibold md:text-[14px]">
              Serverless
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="p-1 pl-0 sm:p-3 xl:p-6">
          <div className="gradientborder flex flex-row items-center justify-between border bg-white bg-opacity-[.15] px-2 py-[21px] md:py-[26px]">
            <div className="leading=[14px] leading=[14px] text-[10px] md:text-[14px]">
              Tenant
            </div>
            <div className="leading=[14px] leading=[14px] text-[10px] opacity-60 md:text-[14px]">
              {tenant3}
            </div>
          </div>
          <div className="gradientborder flex flex-row items-center justify-between border bg-white bg-opacity-5 bg-gradient-box px-2 py-[10px] leading-[16.5px] tracking-[0.14px] text-black">
            <div className="leading=[14px] leading=[14px] font-sans text-[10px] font-semibold md:text-[14px]">
              Provisioned compute
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Region({ region }: { region: string }) {
  return (
    <div className="flex w-full">
      <div className="flex-1 px-3 lg:px-6">
        <div className="gradient w-full rounded-[100px] bg-white bg-opacity-10 p-0 lg:p-6">
          <div className="gradientBorderButton before:rounded-[100px] before:opacity-100">
            <div className="flex w-full flex-row justify-between rounded-[100px] bg-white bg-opacity-20 px-3 py-[10px] sm:px-6 lg:px-[34px]">
              <div className="leading=[14px] leading=[14px] text-[10px] lg:text-[14px]">
                AWS
              </div>
              <div className="leading=[14px] text-[10px] lg:text-[14px]">
                {region}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlaceTenants() {
  return (
    <div className="container mx-auto mt-48">
      <div className="flex flex-col justify-center gap-8">
        <div className="flex flex-col items-center gap-8">
          <NewHeading>
            Place tenants on serverless or provisioned compute - globally
          </NewHeading>
        </div>
        <div className="text-center text-[16px] leading-[16px] lg:text-[24px] lg:leading-[24px]">
          Use serverless for most of your customers to save cost on your AI
          workloads
        </div>
      </div>
      <div className="py-9 lg:px-28">
        <div className="relative flex flex-col transition-all">
          <div className="absolute -left-px -right-px top-0 -z-10 -ml-4 h-1/4 bg-footer-fade"></div>
          <div className="absolute -left-px -right-px bottom-0 -z-10 h-1/4 rotate-180 bg-footer-fade"></div>
          <div className="dashed-gradient-line absolute -left-px bottom-0 top-0 -z-20 flex h-full"></div>
          <div className="relative z-10 -ml-px flex flex-1 flex-col items-center gap-8 py-24 font-mono">
            <div className="flex w-full flex-row">
              <UserRow country="USA" />
              <UserRow country="ASIA" />
            </div>
            <BgHoverer>
              <div className="flex w-full flex-row border">
                <TenantList tenant1="A" tenant2="B" tenant3="C" />
                <TenantList tenant1="D" tenant2="E" tenant3="F" />
              </div>
            </BgHoverer>
            <div className="flex w-full flex-row">
              <Region region="US_EAST_1" />
              <Region region="AP_SOUTHEAST_1" />
            </div>
          </div>
          <div className="dashed-gradient-line absolute bottom-0 left-1/2 top-0 -z-20 -translate-x-1/2" />
          <div className="dashed-gradient-line absolute bottom-0 right-0 top-0 -z-20 flex h-full"></div>
          <div className="hover-bg absolute bottom-0 left-0 right-0 top-0 -z-30 transition-all" />
        </div>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="rounded-[20px] bg-orange">
          <Block
            title="Secure"
            subTitle="Place critical customers on dedicated Postgres compute for performance isolation and security"
            href="/docs/tenant-virtualization/tenant-placement"
          />
        </div>
        <div className="rounded-[20px] bg-purple">
          <Block
            title="Low latency"
            subTitle="Place customer's data and vector embeddings in different region for low latency"
            href="/docs/tenant-virtualization/tenant-placement"
          />
        </div>
        <div className="rounded-[20px] bg-blue">
          <Block
            title="Flexibility"
            subTitle="Move tenants between serverless and provisioned compute with no downtime or application changes"
            href="/docs/tenant-virtualization/tenant-placement"
          />
        </div>
      </div>
    </div>
  );
}
