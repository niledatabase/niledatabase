import React from "react";
import Image from "next/image";

import check from "@/public/icons/check.svg";

export default function Indicator({
  value,
  hideDivider,
  header,
}: {
  value: boolean;
  hideDivider?: boolean;
  header?: string;
}) {
  return (
    <>
      <div className="flex align-center justify-between lg:justify-center">
        <div className="opacity-70 lg:hidden">{header}</div>
        {value ? (
          <div className="bg-brightOrange rounded-full flex align-center justify-center w-5 h-5">
            <Image
              src={check}
              alt="check"
              className="invert"
              width={14}
              height={14}
            />
          </div>
        ) : (
          <NotApplicable />
        )}
      </div>
      <div
        className={"h-px  bg-white"}
        style={{ opacity: hideDivider ? 0 : 0.3 }}
      />
    </>
  );
}

export const NotApplicable = () => (
  <div className="bg-gray rounded-full w-5 h-5 text-slate-950 text-[20px] font-bold leading-[19px] text-center">
    -
  </div>
);
