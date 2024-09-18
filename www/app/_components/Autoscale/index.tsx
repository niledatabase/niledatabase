import Image from "next/image";
import autoscale from "@/public/autoscale.svg";
import Video from "../Video";
import { NewHeading } from "../common/NewHeading";
export default function Autoscale() {
  return (
    <div className="container mx-auto mt-32">
      <div className="flex justify-center flex-col gap-16">
        <div className="flex justify-center flex-col items-center">
          <NewHeading>
            Autoscale to millions of tenants and billions of embeddings
          </NewHeading>
        </div>
        <div className="flex justify-center w-full px-10 lg:px-24 2xl:px-56">
          <Video src="loadbalancer.mp4" poster={"loadbalancer.webp"} />
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6 items-center md:items-start">
          <div className="border-orange border-l-4 pl-5 max-w-[400px] text-[20px] xl:text-[24px] leading-[24px]">
            Scale up instantly when tenants receive bursty AI workloads. Scale
            to zero with no cold start time.
          </div>
          <div className="border-purple border-l-4 pl-5 max-w-[400px] text-[20px] xl:text-[24px] leading-[24px]">
            Pay for exact resources utilized by queries to achieve 10x cost
            efficiency
          </div>
          <div className="border-blue border-l-4 pl-5 max-w-[400px] text-[20px]  xl:text-[24px] leading-[24px]">
            Limitless connections as you grow your AI use case
          </div>
        </div>
      </div>
    </div>
  );
}
