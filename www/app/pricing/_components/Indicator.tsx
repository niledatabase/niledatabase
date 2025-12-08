import React from 'react';
import Image from 'next/image';

import check from '@/public/icons/check.svg';

export default function Indicator({
  value,
  hideDivider,
  header,
}: {
  value: boolean | string;
  hideDivider?: boolean;
  header?: string;
}) {
  if (typeof value === 'string') {
    return (
      <>
        <div className="align-center flex justify-between lg:justify-center">
          <div className="opacity-70 lg:hidden">{header}</div>
          {value}
        </div>
        <div
          className={'h-px bg-white'}
          style={{ opacity: hideDivider ? 0 : 0.3 }}
        />
      </>
    );
  }
  return (
    <>
      <div className="align-center flex justify-between lg:justify-center">
        <div className="opacity-70 lg:hidden">{header}</div>
        {value ? (
          <div className="align-center flex h-5 w-5 justify-center rounded-full bg-brightOrange">
            <Image src={check} alt="check" width={14} height={14} />
          </div>
        ) : (
          <NotApplicable />
        )}
      </div>
      <div
        className={'h-px bg-white'}
        style={{ opacity: hideDivider ? 0 : 0.3 }}
      />
    </>
  );
}

export const NotApplicable = () => (
  <div className="h-5 w-5 rounded-full bg-gray text-center text-[20px] font-bold leading-[19px] text-slate-950">
    -
  </div>
);
