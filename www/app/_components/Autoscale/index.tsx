import Image from "next/image";
import arrow from "@/public/autoscale.png";
export default function Autoscale() {
  return (
    <div className="container mx-auto mt-20">
      <div className="flex justify-center flex-col gap-16">
        <div className="flex justify-center flex-col ">
          <div className="text-[64px] leading-[64px] text-center">
            Autoscale to millions of tenants
          </div>
          <div className="text-[64px] leading-[64px] text-center">
            and billions of embeddings
          </div>
        </div>
        <div className="flex justify-center w-full">
          <Image src={arrow} alt="charging my lazer" height={644} />
        </div>
        <div className="flex flex-row justify-center gap-6">
          <div>
            <div className="border-orange border-l-4 pl-5 w-[400px] text-[24px] leading-[24px]">
              Scale up instantly when tenants receive bursty AI workloads. Scale
              to zero with no cold start time.
            </div>
          </div>
          <div>
            <div className="border-purple border-l-4 pl-5 w-[400px] text-[24px] leading-[24px]">
              Pay for exact resources utilized by queries to achieve 10x cost
              efficiency
            </div>
          </div>
          <div>
            <div className="border-blue border-l-4 pl-5 w-[400px] text-[24px] leading-[24px]">
              Limitless connections as you grow your AI use case
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
