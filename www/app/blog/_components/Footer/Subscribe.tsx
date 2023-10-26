"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import Arrow from "@/public/icons/arrow.svg";

export default function Subscribe() {
  const ref = useRef<HTMLInputElement>(null);
  const [submitted, setDidSubmit] = useState(false);

  return (
    <div
      className={`flex flex-col relative${
        submitted ? " pointer-events-none" : ""
      }`}
    >
      <input
        ref={ref}
        className={`bg-[#141414] border border-[#373737] rounded-[20px] text-[17px] px-5 py-5 lg:px-10 min-w-[250px] lg:min-w-[500px] mb-3 placeholder:opacity-40 focus:outline-none`}
        placeholder="Email Address"
      />
      <div className="lg:absolute lg:right-[8px] lg:top-[9px] md:right-[32px] -right-[19px]">
        <button
          className={`transition-all duration-500 flex flex-row gap-2 text-lg gradientButton font-medium after:rounded-[12px] ${
            submitted ? "lg:w-[484px] w-full" : "w-full"
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
            className="flex flex-row duration-500 trasition-opacity gap-[24px] text-left w-full justify-between"
            style={{
              opacity: submitted ? 0 : 100,
            }}
          >
            <div className="whitespace-nowrap">Join the waitlist</div>
            <Image className="invert" src={Arrow} alt="get started arrow" />
          </div>
          <div
            className={`absolute lg:whitespace-nowrap pointer-events-none trasition-opacity delay-500 duration-500 leading-[18px]`}
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
