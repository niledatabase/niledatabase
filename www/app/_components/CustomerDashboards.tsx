import Heading from "@/app/_components/common/Heading";
import Image from "next/image";
export default function CustomerDashboards() {
  return (
    <div className="flex-1">
      <Heading text="Instant customer dashboards" />
      <div className="overflow-hidden mt-12">
        <Image
          src="/dashboard.png"
          alt="UI dashboards"
          width={1206}
          height={800}
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-center mt-[89px] flex-wrap">
        <div className="lg:w-1/2 xl:w-1/4">
          <div className="py-4 px-5 flex flex-row gap-5 items-center">
            <div className="icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/globe.svg"
                alt="wireframe globe"
                width={41}
                height={40}
              />
            </div>
            <div className="bg-gradient-white bg-clip-text text-transparent text-base">
              Track the growth of customers, users, and queries at all times
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 xl:w-1/4">
          <div className="py-4 px-5 flex flex-row gap-5 items-center">
            <div className="icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/pin.svg"
                alt="wireframe globe"
                width={41}
                height={40}
              />
            </div>
            <div className="bg-gradient-white bg-clip-text text-transparent text-base">
              Dive deeper into specific customers using per-tenant metrics
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 xl:w-1/4">
          <div className="py-4 px-5 flex flex-row gap-5 items-center">
            <div className="icon rounded-[20px] flex justify-center items-center">
              <Image
                src="/icons/rocket.svg"
                alt="wireframe globe"
                width={41}
                height={40}
              />
            </div>
            <div className="bg-gradient-white bg-clip-text text-transparent text-base">
              Manage user profiles for each tenant right from the dashboard
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 xl:w-1/4">
          <div className="py-4 px-5 flex flex-row gap-5 items-center">
            <div className="icon rounded-[20px] flex justify-center items-center">
              <Image
                className="scale-[2]"
                src="/icons/person.svg"
                alt="wireframe globe"
                width={24}
                height={24}
              />
            </div>
            <div className="bg-gradient-white bg-clip-text text-transparent text-base">
              Configure social and enterprise login settings for each customer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
