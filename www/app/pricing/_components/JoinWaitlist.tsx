"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import Arrow from "@/public/icons/arrow.svg";
export default function JoinWaitlist() {
  const [submitted, setDidSubmit] = useState(false);
  console.log(submitted, "what the hell?");
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className={`relative mt-[24px] flex flex-col gap-2${
        submitted ? " pointer-events-none" : ""
      }`}
    >
      <input
        ref={ref}
        className={`w-full bg-[#141414] border border-[#373737] rounded-[12px] text-[16px] py-2.5 px-4 placeholder:opacity-40 focus:outline-none`}
        placeholder="Email Address"
      />
      <button
        onClick={async () => {
          if (ref.current?.value && !submitted) {
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
        className="flex flex-row gap-2 text-[16px] gradientButton mb-[24px] leading-[24px] after:rounded-[12px] px-1 w-full"
      >
        <div
          className="flex flex-row  duration-500 trasition-opacity gap-[24px] justify-between w-full"
          style={{
            opacity: submitted ? 0 : 100,
          }}
        >
          <div>Join the waitlist</div>
          <Image
            className="invert"
            src={Arrow}
            alt="get started arrow"
            width={25}
            height={25}
            priority
          />
        </div>
        <div
          className="absolute whitespace-nowrap pointer-events-none trasition-opacity delay-500 duration-500 -ml-2"
          style={{
            opacity: submitted ? 100 : 0,
          }}
        >
          Thanks for joining! We&apos;ll contact you shortly.
        </div>
      </button>
    </div>
  );
}
