import React from 'react';
export function NewHeading({ children }: { children: JSX.Element | string }) {
  return (
    <h2 className="w-5/6 text-center text-[29px] leading-[34px] -tracking-[0.64px] sm:text-[42px] sm:leading-[42px] lg:text-[50px] lg:leading-[50px] xl:text-[64px] xl:leading-[64px] 2xl:w-2/3">
      {children}
    </h2>
  );
}
