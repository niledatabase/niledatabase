import Image from "next/image";
import { sizes } from "./sizes";
export default function GetStartedButton() {
  return (
    <div className="flex place-content-center">
      <button className="flex flex-row gap-2 text-lg gradientButton mt-10 font-medium after:rounded-[48px]">
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
