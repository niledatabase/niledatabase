import Image from "next/image";
import { sizes } from "./sizes";
export default function GetStartedButton() {
  return (
    <div className="flex items-center">
      <button className="flex flex-row gap-2 text-[16px] gradientButton leading-[24px] after:rounded-[12px] w-[150px] px-1">
        Get Started
        <Image
          src="/arrow.svg"
          alt="get started arrow"
          width={15}
          height={20}
          sizes={sizes}
          priority
        />
      </button>
    </div>
  );
}
