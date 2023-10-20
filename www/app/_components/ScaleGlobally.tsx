import Heading from "@/app/_components/common/Heading";
import Video from "./Video";
import Image from "next/image";
export default function DropInUserManagement() {
  return (
    <div className="container mx-auto">
      <div className="md:px-4 md:py-4 pb-0 2xl:px-24 2xl:py-4">
        <div className="flex w-full flex-col">
          <div className="flex flex-col text-center align-middle flex-1 mb-[87px]  bgDivider pt-20 mt-20">
            <Heading text="Onboard tenants once, place globally" />
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center bg-[#000]">
            <div className="py-5 px-4 md:w-1/3 itemDivider flex flex-row gap-5">
              <div className="z-10 relative icon rounded-[20px] flex justify-center">
                <Image
                  src="/icons/globe.svg"
                  alt="wireframe globe"
                  width={41}
                  height={40}
                />
              </div>
              <div className="opacity-60 text-[18px] relative z-10">
                Place isolated tenant databases globally with the user
                experience, operational simplicity, and cost efficiency of a
                single database
              </div>
            </div>
            <div className="py-5 px-4 md:w-1/3  itemDivider flex flex-row gap-5">
              <div className="z-10 relative icon rounded-[20px] flex justify-center">
                <Image
                  src="/icons/pin.svg"
                  alt="location pin"
                  width={41}
                  height={40}
                />
              </div>
              <div className="opacity-60 text-[18px] relative z-10">
                Store tenant’s data closer to their application for low latency
                and satisfy compliance requirements
              </div>
            </div>
            <div className="py-5 px-4 md:w-1/3 itemDivider flex flex-row gap-5">
              <div className="z-10 relative icon rounded-[20px] flex justify-center">
                <Image
                  src="/icons/rocket.svg"
                  alt="location pin"
                  width={41}
                  height={40}
                />
              </div>
              <div className="opacity-60 text-[18px] relative z-10">
                We deploy, we route, and we manage. Seamless schema migrations,
                incremental rollouts, and client-side routing.
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center -mb-32">
            <div className="flex lg:w-1/2">
              <Video
                poster="earth.jpg"
                src="earth.mp4"
                className="aspect-square"
              />
            </div>
            <div className="flex lg:w-1/2 -mt-[220px] lg:mt-0 items-center justify-center">
              <Video poster="globe.svg" src="global.mp4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
