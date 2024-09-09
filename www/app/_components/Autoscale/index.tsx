import Image from "next/image";
import autoscale from "@/public/autoscale.svg";
export default function Autoscale() {
  return (
    <div className="container mx-auto mt-48">
      <div className="flex justify-center flex-col gap-16">
        <div className="flex justify-center flex-col items-center">
          <div className="text-[32px] leading-[32px] lg:text-[64px] lg:leading-[64px] text-center w-5/6">
            Autoscale to millions of tenants and billions of embeddings
          </div>
        </div>
        <div className="flex justify-center w-full">
          <Image src={autoscale} alt="charging my lazer" height={644} />
        </div>
        <div className="flex flex-col xl:flex-row justify-center gap-6 items-center xl:items-start">
          <div className="border-orange border-l-4 pl-5 max-w-[400px] text-[20px] lg:text-[24px] leading-[24px]">
            Scale up instantly when tenants receive bursty AI workloads. Scale
            to zero with no cold start time.
          </div>
          <div className="border-purple border-l-4 pl-5 max-w-[400px] text-[20px] lg:text-[24px] leading-[24px]">
            Pay for exact resources utilized by queries to achieve 10x cost
            efficiency
          </div>
          <div className="border-blue border-l-4 pl-5 max-w-[400px] text-[20px]  lg:text-[24px] leading-[24px]">
            Limitless connections as you grow your AI use case
          </div>
        </div>
      </div>
    </div>
  );
}
