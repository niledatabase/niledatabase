import Heading from '@/app/_components/common/Heading';
import Image from 'next/image';
export default function Elastic() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col text-center align-middle flex-1 mb-[87px]">
        <Heading text="Effortlessly Elastic" />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-1/2">
          <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/serverless.svg"
                alt="location pin"
                width={40}
                height={40}
              />
            </div>
            <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
              Truly serverless - &quot;Think queries, not machines&quot;
            </div>
          </div>
          <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/money.svg"
                alt="location pin"
                width={40}
                height={40}
              />
            </div>
            <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
              Pay for what you use
            </div>
          </div>
          <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/bolt.svg"
                alt="location pin"
                width={40}
                height={40}
              />
            </div>
            <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
              Scales to zero with instant availability
            </div>
          </div>
          <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/people.svg"
                alt="location pin"
                width={40}
                height={40}
              />
            </div>
            <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
              Scale to millions of tenants
            </div>
          </div>
          <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/link.svg"
                alt="location pin"
                width={40}
                height={40}
              />
            </div>
            <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
              Limitless connections as you grow
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <Image
            src="/elastic.png"
            alt="spiral intertube with orange, pink, and teal gradient"
            width={440}
            height={440}
          />
        </div>
      </div>
    </div>
  );
}
