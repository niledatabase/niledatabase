import Image from "next/image";
import { Block } from "../block";
import placeGlobally from "@/public/place-globally.png";

export default function PlaceTenants() {
  return (
    <div className="container mx-auto mt-48">
      <div className="flex justify-center flex-col gap-8">
        <div className="flex flex-col gap-8">
          <div>
            <div className="text-[64px] leading-[64px] text-center">
              Place tenants on serverless or
            </div>
            <div className="text-[64px] leading-[64px] text-center">
              provisioned compute - globally
            </div>
          </div>
          <div className="text-[24px] leading-[24px] text-center">
            Use serverless for most of your customers to save cost on your AI
            workloads
          </div>
        </div>
        <Image
          src={placeGlobally}
          alt="gradient dropdowns with tenants and regions"
        />
        <div className="flex flex-row gap-6">
          <div className="bg-orange rounded-lg">
            <Block
              title="Secure"
              subTitle="Place critical customers on dedicated Postgres compute for performance isolation and security"
              href="/pricing"
            />
          </div>
          <div className="bg-purple rounded-lg">
            <Block
              title="Low Latency"
              subTitle="Place customer's data and vector embeddings in different region for low latency"
              href="/pricing"
            />
          </div>
          <div className="bg-blue rounded-lg">
            <Block
              title="Flexibility"
              subTitle="Move tenants between serverless and provisioned compute with no downtime or application changes"
              href="/pricing"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
