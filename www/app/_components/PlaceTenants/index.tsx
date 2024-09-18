"use client";
import Image from "next/image";
import { Block } from "../block";
import user from "@/public/icons/user.svg";
import BgHoverer from "./BgHoverer";
import { NewHeading } from "../common/NewHeading";

type Props = {
  tenant1: string;
  tenant2: string;
  tenant3: string;
  region: string;
  country: string;
};
function UserRow({ country }: { country: string }) {
  return (
    <div className="flex items-center justify-center w-1/2">
      <div className="flex flex-row gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-[100px] mt-6 items-center">
        <Image alt="user icon" src={user} />
        <div className="text-[10px] leading=[14px] lg:text-[14px] leading=[14px]">
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
    <div className="bg-white bg-opacity-10 flex flex-row w-full gap-1 sm:gap-3 xl:gap-6 border gradientborder">
      <div className="w-1/2">
        <div className="p-1 sm:p-3 xl:p-6 pr-0">
          <div className="flex flex-row justify-between items-center bg-white bg-opacity-5 px-2 py-[10px] border gradientborder leading-[16.5px]">
            <div className="text-[10px] leading=[14px] md:text-[14px] leading=[14px]">
              Tenant
            </div>
            <div className="opacity-60 text-[10px] leading=[14px] md:text-[14px] leading=[14px]">
              {tenant1}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center bg-white bg-opacity-5 px-2 py-[10px] border gradientborder -mt-px leading-[16.5px]">
            <div className="text-[10px] leading=[14px] md:text-[14px] leading=[14px]">
              Tenant
            </div>
            <div className="opacity-60 text-[10px] leading=[14px] md:text-[14px] leading=[14px]">
              {tenant2}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center bg-white bg-opacity-5 px-2 py-[10px] border gradientborder -mt-px bg-gradient-box text-black leading-[16.5px] tracking-[0.14px]">
            <div className="font-sans font-semibold text-[10px] leading=[14px] md:text-[14px] leading=[14px]">
              Serverless
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="p-1 sm:p-3 xl:p-6 pl-0">
          <div className="flex flex-row justify-between items-center bg-white bg-opacity-[.15] px-2 py-[21px] md:py-[26px] border gradientborder">
            <div className="text-[10px] leading=[14px] md:text-[14px] leading=[14px]">
              Tenant
            </div>
            <div className="opacity-60 text-[10px] leading=[14px] md:text-[14px] leading=[14px]">
              {tenant3}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center bg-white bg-opacity-5 px-2 py-[10px] border gradientborder bg-gradient-box text-black leading-[16.5px] tracking-[0.14px]">
            <div className="font-sans font-semibold text-[10px] leading=[14px] md:text-[14px] leading=[14px]">
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
      <div className="px-3 lg:px-6 flex-1">
        <div className="bg-white bg-opacity-10 w-full p-0 lg:p-6 rounded-[100px] gradient">
          <div className="gradientBorderButton before:opacity-100 before:rounded-[100px]">
            <div className="bg-white bg-opacity-20 flex flex-row justify-between w-full rounded-[100px] px-3 sm:px-6 lg:px-[34px] py-[10px]">
              <div className="text-[10px] leading=[14px] lg:text-[14px] leading=[14px]">
                AWS
              </div>
              <div className="text-[10px] leading=[14px] lg:text-[14px]">
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
      <div className="flex justify-center flex-col gap-8">
        <div className="flex flex-col gap-8 items-center">
          <NewHeading>
            Place tenants on serverless or provisioned compute - globally
          </NewHeading>
        </div>
        <div className="text-[16px] leading-[16px] lg:text-[24px] lg:leading-[24px] text-center">
          Use serverless for most of your customers to save cost on your AI
          workloads
        </div>
      </div>
      <div className="lg:px-28 py-9">
        <div className="flex flex-col relative transition-all">
          <div className="absolute top-0 bg-footer-fade h-1/4 -left-px -right-px -ml-4 -z-10"></div>
          <div className="absolute bottom-0 -left-px -right-px bg-footer-fade h-1/4 -z-10 rotate-180"></div>
          <div className="dashed-gradient-line flex absolute top-0 -left-px bottom-0 h-full -z-20"></div>
          <div className="flex-1 flex items-center flex-col font-mono -ml-px gap-8  py-24 relative z-10">
            <div className="flex flex-row w-full">
              <UserRow country="USA" />
              <UserRow country="ASIA" />
            </div>
            <BgHoverer>
              <div className="flex flex-row w-full border">
                <TenantList tenant1="A" tenant2="B" tenant3="C" />
                <TenantList tenant1="D" tenant2="E" tenant3="F" />
              </div>
            </BgHoverer>
            <div className="flex flex-row w-full">
              <Region region="US_EAST_1" />
              <Region region="AP_SOUTHEAST_1" />
            </div>
          </div>
          <div className="dashed-gradient-line absolute -z-20 top-0 -translate-x-1/2 left-1/2 bottom-0" />
          <div className="dashed-gradient-line flex absolute top-0 right-0 bottom-0 h-full -z-20"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 -z-30 transition-all hover-bg" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-orange rounded-lg">
          <Block
            title="Secure"
            subTitle="Place critical customers on dedicated Postgres compute for performance isolation and security"
            href="/docs/tenant-virtualization/tenant-placement"
          />
        </div>
        <div className="bg-purple rounded-lg">
          <Block
            title="Low latency"
            subTitle="Place customer's data and vector embeddings in different region for low latency"
            href="/docs/tenant-virtualization/tenant-placement"
          />
        </div>
        <div className="bg-blue rounded-lg">
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
