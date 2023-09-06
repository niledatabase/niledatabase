"use client";
import Image from "next/image";
import { sizes } from "@/app/_components/common/sizes";
import { useRef, useState } from "react";

const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;

export default function Subscribe() {
  const ref = useRef<HTMLInputElement>(null);
  const [submitted, setDidSubmit] = useState(false);

  return (
    <div className="relative">
      <input
        ref={ref}
        className={`bg-[#141414] rounded-[20px] border-1 border-[#373737] font-[17px] py-5 px-10 min-w-[500px] mb-3`}
        placeholder="Email Address"
      />
      <div className="absolute right-[8px] top-[8px]">
        <button
          className={`transition-all duration-500 flex flex-row gap-2 text-lg gradientButton font-medium after:rounded-[12px] ${
            submitted ? "w-[484px]" : "w-[140px]"
          }`}
          onClick={async () => {
            if (ref.current?.value) {
              console.log(ref.current.value);
              const res = await fetch(`${SERVER_URI}/api/subscribe`, {
                method: "POST",
                body: JSON.stringify({ email: ref.current.value }),
              });
              if (res.status === 204) {
                setDidSubmit(true);
              }
              ref.current.value = "";
            }
          }}
        >
          <div
            className={`flex flex-row  duration-500 ${
              submitted ? "opacity-0" : "opacity-100"
            } trasition-opacity`}
          >
            <div>Subscribe</div>
            <Image
              src="/arrow.svg"
              alt="get started arrow"
              width={15}
              height={20}
              sizes={sizes}
              priority
            />
          </div>
          <div
            className={`absolute whitespace-nowrap ${
              submitted ? "opacity-100" : "opacity-0"
            } trasition-opacity delay-500 duration-500`}
          >
            Thanks for subscribing!
          </div>
        </button>
      </div>
    </div>
  );
}
