import Image from "next/image";
import Arrow from "@/public/icons/arrow.svg";
export default function GetStartedButton() {
  return (
    <div className="flex items-center">
      <button className="flex flex-row gap-2 text-[16px] gradientButton leading-[24px] after:rounded-[12px] w-[170px] px-1">
        Join the waitlist
        <Image
          src={Arrow}
          alt="get started arrow"
          width={15}
          data-image-zoom-disabled
          height={20}
          priority
        />
      </button>
    </div>
  );
}
