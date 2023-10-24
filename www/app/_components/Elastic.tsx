import Heading from "@/app/_components/common/Heading";
import Image from "next/image";

import Serverless from "@/public/icons/serverless.svg";
import Money from "@/public/icons/money.svg";
import Bolt from "@/public/icons/bolt.svg";
import People from "@/public/icons/people.svg";
import Link from "@/public/icons/link.svg";
import ElasticImage from "@/public/elastic.png";
export default function Elastic() {
  return (
    <div className="container mx-auto">
      <div className="md:px-4 md:py-4 pb-0 2xl:px-24 2xl:py-4">
        <div className="flex w-full flex-col">
          <div className="flex flex-col text-center align-middle flex-1 mb-[87px]  bgDivider pt-20 mt-20">
            <Heading text="Effortlessly elastic" />
          </div>
          <div className="flex flex-col lg:flex-row items-center bg-[#000]">
            <div className="lg:w-1/2 relative z-[11]">
              <div className="py-4 px-5 flex flex-row gap-5 items-center">
                <div className="z-10 relative icon rounded-[20px] flex justify-center">
                  <Image
                    src={Serverless}
                    alt="location pin"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="bg-gradient-white bg-clip-text text-transparent leading-normal text-xl z-10 relative">
                  Truly serverless - &quot;Think queries, not machines&quot;
                </div>
              </div>
              <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
                <div className="z-10 relative icon rounded-[20px] flex justify-center">
                  <Image
                    src={Money}
                    alt="location pin"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="bg-gradient-white bg-clip-text text-transparent leading-normal text-xl z-10 relative">
                  Pay for what you use
                </div>
              </div>
              <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
                <div className="z-10 relative icon rounded-[20px] flex justify-center">
                  <Image src={Bolt} alt="location pin" width={40} height={40} />
                </div>
                <div className="bg-gradient-white bg-clip-text text-transparent leading-normal text-xl z-10 relative">
                  Scales to zero with instant availability
                </div>
              </div>
              <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
                <div className="z-10 relative icon rounded-[20px] flex justify-center">
                  <Image
                    src={People}
                    alt="location pin"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="bg-gradient-white bg-clip-text text-transparent leading-normal text-xl z-10 relative">
                  Scale to millions of tenants
                </div>
              </div>
              <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
                <div className="z-10 relative icon rounded-[20px] flex justify-center">
                  <Image src={Link} alt="location pin" width={40} height={40} />
                </div>
                <div className="bg-gradient-white bg-clip-text text-transparent leading-normal text-xl z-10 relative">
                  Limitless connections as you grow
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative flex items-center justify-center overflow-hidden lg:overflow-visible">
              <div className="z-10 absolute -top-[10%] left-0 right-0 h-[21%] blur-[22px] bg-[#000]"></div>
              <div className="z-10 absolute -bottom-[10%] left-0 right-0 h-[21%] blur-[22px] bg-[#000]"></div>
              <div className="z-10 absolute top-0 -left-[12%] lg:-left-[16px] bottom-0 w-[21%] blur-[22px] bg-[#000]"></div>
              <div className="z-10 absolute top-0 bottom-0 -right-[12%] lg:-right-[16px] w-[21%] blur-[22px] bg-[#000]"></div>
              <Image
                className="relative"
                src={ElasticImage}
                alt="spiral intertube with orange, pink, and teal gradient"
                width={540}
                height={540}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
