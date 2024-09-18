import Container from "@/app/_components/common/Container";
import PageHeader from "@/app/_components/common/PageHeader";

import Image from "next/image";
import Contact from "./_components/Contact";
import Heart from "@/public/heart.svg";
import Arrow from "@/public/icons/arrow.svg";
export default function ContactUs() {
  return (
    <Container background="circular">
      <PageHeader title="Contact Us" color="white"></PageHeader>
      <div className="flex flex-col md:flex-row mt-24 w-full gap-3">
        <div className="md:w-1/2">
          <div className="itemDivider px-12 py-8 flex justify-center flex-col">
            <div className="flex flex-row mt-32 items-center w-full justify-center text-[40px] z-10">
              We
              <Image
                src={Heart}
                alt="orange 8-bit heart"
                width={62}
                height={62}
                priority
              />
              Developers
            </div>
            <div>
              <button className="flex flex-row gap-2 text-[16px] gradientButton my-[24px] leading-[24px] after:rounded-[12px] px-1 w-full !justify-between">
                <span>Join Community</span>
                <Image
                  className="invert"
                  src={Arrow}
                  alt="arrow"
                  width={25}
                  height={30}
                  priority
                />
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <Contact />
        </div>
      </div>
    </Container>
  );
}
