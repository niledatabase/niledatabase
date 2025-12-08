'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Arrow from '@/public/icons/arrow.svg';
export default function JoinWaitlist() {
  const [submitted, setDidSubmit] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className={`relative mt-[24px] flex flex-col gap-2${
        submitted ? 'pointer-events-none' : ''
      }`}
    >
      <input
        ref={ref}
        className={`w-full rounded-[12px] border border-[#373737] bg-[#141414] px-4 py-2.5 text-[16px] placeholder:opacity-40 focus:outline-none`}
        placeholder="Email Address"
      />
      <button
        onClick={async () => {
          if (ref.current?.value && !submitted) {
            const res = await fetch(`/api/subscribe`, {
              method: 'POST',
              body: JSON.stringify({ email: ref.current.value }),
            });
            if (res.status === 204) {
              setDidSubmit(true);
            }
            ref.current.value = '';
          }
        }}
        className="gradientButton mb-[24px] flex w-full flex-row gap-2 px-1 text-[16px] leading-[24px] after:rounded-[12px]"
      >
        <div
          className="flex w-full flex-row justify-between gap-[24px] transition-opacity duration-500"
          style={{
            opacity: submitted ? 0 : 100,
          }}
        >
          <div>Join the waitlist</div>
          <Image
            className="invert"
            data-image-zoom-disabled
            src={Arrow}
            alt="get started arrow"
            width={25}
            height={25}
            priority
          />
        </div>
        <div
          className="pointer-events-none absolute -ml-2 whitespace-nowrap transition-opacity delay-500 duration-500"
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
