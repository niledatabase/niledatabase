import Heading from '@/app/_components/common/Heading';
import Video from './Video';
import Image from 'next/image';
export default function DropInUserManagement() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col text-center align-middle flex-1 mb-[87px]">
        <Heading text="Onboard Tenants once, Place globally" />
      </div>
      <div className="flex flex-row gap-4 justify-center">
        <div className="py-4 px-5 w-[395px] itemDivider flex flex-row gap-5">
          <div className="z-10 relative icon rounded-[20px] flex justify-center">
            <Image
              src="/icons/globe.svg"
              alt="wireframe globe"
              width={41}
              height={40}
            />
          </div>
          <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
            A single database that spans the globe
          </div>
        </div>
        <div className="py-4 px-5 w-[395px] itemDivider flex flex-row gap-5">
          <div className="z-10 relative icon rounded-[20px] flex justify-center">
            <Image
              src="/icons/pin.svg"
              alt="location pin"
              width={41}
              height={40}
            />
          </div>
          <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
            Place tenants in any region
          </div>
        </div>
        <div className="py-4 px-5 w-[395px] itemDivider flex flex-row gap-5">
          <div className="z-10 relative icon rounded-[20px] flex justify-center">
            <Image
              src="/icons/rocket.svg"
              alt="location pin"
              width={41}
              height={40}
            />
          </div>
          <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
            We deploy, we route, we manage
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex w-1/2">
          <Video poster="earth.svg" src="earth.mp4" />
        </div>
        <div className="flex w-1/2">
          <Video poster="globe.svg" src="global.mp4" />
        </div>
      </div>
    </div>
  );
}
