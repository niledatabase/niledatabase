import Container from '@/app/_components/common/Container';
import PageHeader from '@/app/_components/common/PageHeader';

import Image from 'next/image';
import Contact from './_components/Contact';
import Heart from '@/public/heart.svg';
import Arrow from '@/public/icons/arrow.svg';
export default function ContactUs() {
  return (
    <Container background="circular">
      <div className="container mx-auto">
        <div className="flex flex-col gap-24 py-32 pb-10 sm:px-4 md:px-12 md:py-24 xl:px-24 xl:py-48">
          <PageHeader title="Contact Us" color="white"></PageHeader>
          <div className="flex flex-col justify-center gap-3 md:flex-row">
            <div className="max-w-xl md:w-1/2">
              <div className="itemDivider flex flex-col justify-center px-12 py-8">
                <div className="z-10 mt-5 flex w-full flex-row items-center justify-center text-[40px]">
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
                  <a
                    href="https://discord.com/invite/8UuBB84tTy"
                    target="_blank"
                  >
                    <button className="gradientButton my-[24px] flex w-full flex-row !justify-between gap-2 px-1 text-[16px] leading-[24px] after:rounded-[12px]">
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
                  </a>
                </div>
              </div>
            </div>
            <div className="max-w-xl md:w-1/2">
              <Contact />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
