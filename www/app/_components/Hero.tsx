import Image from 'next/image';
import Link from 'next/link';
import arrow from '@/public/icons/arrow.svg';
import { HeroText } from './common/Hero';

export default function Hero() {
  return (
    <div className="container mx-auto">
      <div className="py-12 pb-8 sm:px-4 md:px-12 md:py-12 xl:px-24 xl:py-24">
        <div className="flex flex-col gap-8">
          <div className="flex justify-start">
            <Link
              href="https://www.thenile.dev/blog/introducing-nile-auth"
              className="relative flex flex-row"
            >
              <div className="flex w-full flex-row items-center justify-center gap-2 rounded-[10px] bg-gray p-2 px-4 py-2 text-center text-[16px] leading-[20px] text-[#fff] transition-colors hover:bg-lightGray">
                <span>
                  Introducing Nile Auth <span>Learn more</span>
                </span>
                <Image
                  className="-ml-1"
                  src={arrow}
                  alt="arrow"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
          </div>
          <HeroText />
        </div>
      </div>
    </div>
  );
}
