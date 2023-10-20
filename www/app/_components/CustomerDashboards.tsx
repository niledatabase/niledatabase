import Heading from "@/app/_components/common/Heading";
import Image from "next/image";
export default function CustomerDashboards() {
  return (
    <div className="container mx-auto">
      <div className="md:px-4 md:py-4 pb-0 2xl:px-24 2xl:py-4">
        <div className="flex-1">
          <div className="flex flex-col text-center align-middle flex-1 bgDivider pt-20 mt-20 -z-20">
            <Heading text="Instant customer dashboards" />
          </div>

          <div className="bg-[#000]">
            <div className="overflow-hidden flex justify-center ">
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
                      className="scale-150"
                      src="/icons/growth.svg"
                      alt="wireframe growth"
                      width={41}
                      height={40}
                    />
                  </div>
                  <div className="opacity-60 text-[18px] bg-clip-text">
                    Track the growth of customers, users, and queries at all
                    times
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 xl:w-1/4">
                <div className="py-4 px-5 flex flex-row gap-5 items-center">
                  <div className="icon rounded-[20px] flex justify-center">
                    <Image
                      className="scale-150"
                      src="/icons/deepdive.svg"
                      alt="wireframe deepdive"
                      width={41}
                      height={40}
                    />
                  </div>
                  <div className="opacity-60 text-[18px] bg-clip-text">
                    Dive into specific customers using per-tenant metrics
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 xl:w-1/4">
                <div className="py-4 px-5 flex flex-row gap-5 items-center">
                  <div className="icon rounded-[20px] flex justify-center items-center">
                    <Image
                      className="scale-150"
                      src="/icons/manageprofiles.svg"
                      alt="wireframe globe"
                      width={41}
                      height={40}
                    />
                  </div>
                  <div className="opacity-60 text-[18px] bg-clip-text">
                    Manage user profiles for each tenant right from the
                    dashboard
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 xl:w-1/4">
                <div className="py-4 px-5 flex flex-row gap-5 items-center">
                  <div className="icon rounded-[20px] flex justify-center items-center">
                    <Image
                      className="scale-[3]"
                      src="/icons/authpertenant.svg"
                      alt="wireframe globe"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="opacity-60 text-[18px] bg-clip-text">
                    Configure auth settings per customer with single click
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
