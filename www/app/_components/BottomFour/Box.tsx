import React from "react";
import Image from "next/image";

import check from "@/public/icons/check.svg";
import BgHoverer from "../PlaceTenants/BgHoverer";

type Props = {
  title: string[];
  bullets: string[];
  children: JSX.Element;
};
export default function Box(props: Props) {
  const { title, bullets, children } = props;
  return (
    <div className="flex flex-col bg-darkGray rounded-lg h-full justify-between overflow-hidden">
      <BgHoverer>
        <div className="inline-flex lg:block gap-2 p-4 lg:p-10">
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

        <div className="flex flex-col flex-1 justify-between">
          <div className="">{children}</div>
          <div className="flex flex-col gap-3 lg:gap-6 pl-4 pt-4 pb-4 lg:pl-10 lg:pt-10 lg:pb-10">
            {bullets.map((bullet) => {
              return (
                <div
                  key={bullet}
                  className="flex flex-row gap-4 items-start w-5/6"
                >
                  <div className="shrink-0 mt-1">
                    <Image alt="check mark" src={check}></Image>
                  </div>
                  <div className="font-medium text-[18px] leading-[20px] xl:text-[20px] xl:leading-[24px]">
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
