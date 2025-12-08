import Link from 'next/link';
import Image from 'next/image';
import arrow from '@/public/icons/arrow.svg';

export function Block({
  title,
  subTitle,
  href,
}: {
  title: string;
  subTitle: string;
  href: string;
}) {
  return (
    <div className="flex h-full min-h-[216px] max-w-[472px] flex-1 flex-col justify-between p-6">
      <div className="flex flex-col gap-2">
        <div className="text-[24px] font-medium leading-[24px] text-black">
          {title}
        </div>
        <div className="text-[16px] font-normal leading-[20px] text-black lg:text-[18px] lg:leading-[18px] xl:text-[20px] xl:leading-[24px]">
          {subTitle}
        </div>
      </div>
      <div>
        <Link
          className="flex flex-row items-center gap-2 text-[16px] font-medium leading-[24px] text-black"
          href={href}
        >
          <div className="flex flex-row items-center gap-2 border-b border-b-transparent transition-colors hover:border-b-[#000]">
            Learn more
            <Image
              src={arrow}
              alt="arrow"
              width={24}
              height={24}
              className="invert"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
