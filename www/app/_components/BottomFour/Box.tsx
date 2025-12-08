import React from 'react';
import Image from 'next/image';

import check from '@/public/icons/check.svg';
import BgHoverer from '../PlaceTenants/BgHoverer';

type Props = {
  title: string[];
  bullets: string[];
  children: JSX.Element;
};
export default function Box(props: Props) {
  const { title, bullets, children } = props;
  return (
    <div className="flex h-full flex-col justify-between overflow-hidden rounded-[20px] bg-darkGray">
      <BgHoverer>
        <div className="inline-flex gap-2 p-4 lg:block lg:p-10">
          {title.map((item) => {
            return (
              <div
                key={item}
                className="text-[24px] leading-[28px] lg:text-[42px] lg:leading-[42px]"
              >
                {item}
              </div>
            );
          })}
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="">{children}</div>
          <div className="flex flex-col gap-3 pb-4 pl-4 pt-4 lg:gap-6 lg:pb-10 lg:pl-10 lg:pt-10">
            {bullets.map((bullet) => {
              return (
                <div
                  key={bullet}
                  className="flex w-5/6 flex-row items-start gap-4"
                >
                  <div className="shrink-0">
                    <Image
                      alt="check mark"
                      className="invert"
                      width="24"
                      src={check}
                    ></Image>
                  </div>
                  <div className="text-[18px] font-medium leading-[20px] xl:text-[20px] xl:leading-[24px]">
                    {bullet}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </BgHoverer>
    </div>
  );
}
