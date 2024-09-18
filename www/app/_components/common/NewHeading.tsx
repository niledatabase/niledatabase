import React from "react";
export function NewHeading({ children }: { children: JSX.Element | string }) {
  return (
    <h2 className="text-[32px] leading-[32px] xl:text-[64px] xl:leading-[64px] lg:leading-[50px] lg:text-[50px] text-center w-5/6 2xl:w-2/3 -tracking-[0.64px]">
      {children}
    </h2>
  );
}
