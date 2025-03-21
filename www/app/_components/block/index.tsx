import Link from "next/link";
import Image from "next/image";
import arrow from "@/public/icons/arrow.svg";

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
    <div className="p-6 flex flex-col max-w-[472px] flex-1 justify-between min-h-[216px] h-full">
      <div className="flex flex-col gap-2">
        <div className="text-black  text-[24px] leading-[24px] font-medium">
          {title}
        </div>
        <div className="text-black text-[16px] leading-[20px] xl:text-[20px] xl:leading-[24px] lg:text-[18px] lg:leading-[18px] font-normal">
          {subTitle}
        </div>
      </div>
      <div>
        <Link
          className="text-black text-[16px] leading-[24px] font-medium flex flex-row items-center gap-2"
          href={href}
        >
          <div className="transition-colors border-b border-b-transparent hover:border-b-[#000] flex flex-row items-center gap-2">
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
