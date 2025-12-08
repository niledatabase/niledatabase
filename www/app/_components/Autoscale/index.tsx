import Image from 'next/image';
import autoscale from '@/public/autoscale.svg';
import Video from '../Video';
import { NewHeading } from '../common/NewHeading';
export default function Autoscale() {
  return (
    <div className="container mx-auto mt-32">
      <div className="flex flex-col justify-center gap-16">
        <div className="flex flex-col items-center justify-center">
          <NewHeading>
            Autoscale to millions of tenants and billions of embeddings
          </NewHeading>
        </div>
        <div className="flex w-full justify-center px-10 lg:px-24 2xl:px-56">
          <Video src="loadbalancer.mp4" poster={'loadbalancer.webp'} />
        </div>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-start">
          <div className="max-w-[400px] border-l-4 border-orange pl-5 text-[20px] leading-[24px] xl:text-[24px]">
            Scale up instantly when tenants receive bursty AI workloads. Scale
            to zero with no cold start time.
          </div>
          <div className="max-w-[400px] border-l-4 border-purple pl-5 text-[20px] leading-[24px] xl:text-[24px]">
            Pay for exact resources utilized by queries to achieve 10x cost
            efficiency
          </div>
          <div className="max-w-[400px] border-l-4 border-blue pl-5 text-[20px] leading-[24px] xl:text-[24px]">
            Limitless connections as you grow your AI use case
          </div>
        </div>
      </div>
    </div>
  );
}
