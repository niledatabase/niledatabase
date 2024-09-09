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
        <div className="text-black text-[16px] leading-[20px] lg:text-[20px] lg:leading-[24px] font-normal w-5/6">
          {subTitle}
        </div>
      </div>
      <div className="flex flex-row items-center">
        <Link
          className="text-black text-[16px] leading-[24px] font-medium"
          href={href}
        >
          Learn more
        </Link>
        <Image
          src={arrow}
          alt="arrow"
          width={24}
          height={24}
          className="invert"
        />
      </div>
    </div>
  );
}
