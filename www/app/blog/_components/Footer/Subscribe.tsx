"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import Arrow from "@/public/icons/arrow.svg";

export default function Subscribe() {
  const ref = useRef<HTMLInputElement>(null);
  const [submitted, setDidSubmit] = useState(false);

  return (
    <div className={`relative${submitted ? " pointer-events-none" : ""}`}>
      <input
        ref={ref}
        className={`bg-[#141414] border border-[#373737] rounded-[20px] text-[17px] py-5 px-10 lg:min-w-[500px] mb-3 placeholder:opacity-40 focus:outline-none`}
        placeholder="Email Address"
      />
      <div className="absolute lg:right-[8px] lg:top-[9px] right-[32px]">
        <button
          className={`transition-all duration-500 flex flex-row gap-2 text-lg gradientButton font-medium after:rounded-[12px] ${
            submitted ? "w-[484px]" : "w-[200px]"
          }`}
          onClick={async () => {
            if (ref.current?.value) {
              const res = await fetch(`/api/subscribe`, {
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
            className="flex flex-row duration-500 trasition-opacity gap-[24px]"
            style={{
              opacity: submitted ? 0 : 100,
            }}
          >
            <div className="whitespace-nowrap">Join the waitlist</div>
            <Image className="invert" src={Arrow} alt="get started arrow" />
          </div>
          <div
            className={`absolute whitespace-nowrap pointer-events-none trasition-opacity delay-500 duration-500`}
            style={{
              opacity: submitted ? 100 : 0,
            }}
          >
            Thanks for joining! We&apos;ll be contacting you shortly.
          </div>
        </button>
      </div>
    </div>
  );
}
