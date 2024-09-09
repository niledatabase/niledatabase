"use client";
import Image from "next/image";
import chevron from "@/public/icons/chevron.svg";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
const items = [
  {
    title: "TaskPilot AI",
    icon: "🥇",
    description: "Your AI-Driven Guide to Seamless Task Management",
  },
  {
    title: "Slack++",
    icon: "💬",
    description: "Built with AI to power work",
  },
  {
    title: "AITravelMate",
    icon: "🧳",
    description: "Your business trips managed by AI",
  },
  {
    title: "SmartSpend AI",
    icon: "💸",
    description: "Set teams free from manual expenses",
  },
];
type Props = {
  title: string;
  icon: string;
  description: string;
};
function CarouselItem(props: Props) {
  const { title, icon, description } = props;
  return (
    <div className="w-[329px] lg:w-[388px] h-[380px] lg:h-[472px] bg-gray rounded-xl overflow-hidden justify-between shrink-0">
      <div className="items-center justify-center flex h-1/2 p-6">
        <div className="rounded-lg h-[174px] w-[174px] bg-darkGray items-center justify-center flex">
          <span className="text-[130px] leading-0">{icon}</span>
        </div>
      </div>
      <div className="bg-darkGray h-1/2">
        <div className="p-6 flex flex-col gap-4">
          <div className="text-[32px] leading-8">{title}</div>
          <div className="text-[24px] leading-6">{description}</div>
        </div>
      </div>
    </div>
  );
}

const DEFAULT_FULL_ITEM_WIDTH = 388 + 24;
const MOBILE_FULL_ITEM_WIDTH = 329 + 12;
export default function BuiltOnNile() {
  const [itemWidth, setItemWidth] = useState(DEFAULT_FULL_ITEM_WIDTH);
  const [extra, setExtra] = useState(48);
  const [toMove, setToMove] = useState(3);
  const [x, setX] = useState(0);

  useEffect(() => {
    if (window.innerWidth < 968) {
      setItemWidth(MOBILE_FULL_ITEM_WIDTH);
      setExtra(0);
      setToMove(1);
    }
  }, []);

  const AMOUNT_TO_MOVE = useMemo(
    () => itemWidth * toMove + extra,
    [itemWidth, toMove, extra]
  );

  const maxPosition = useMemo(
    () => items.length * itemWidth + extra,
    [items.length, itemWidth, extra]
  );
  const ref = useRef<HTMLDivElement>(null);

  const forward = useCallback(() => {
    const containerWidth = ref.current?.clientWidth ?? 0;
    setX(Math.min(x + AMOUNT_TO_MOVE, maxPosition - containerWidth));
  }, [x, AMOUNT_TO_MOVE]);

  const back = useCallback(() => {
    setX(Math.max(x - AMOUNT_TO_MOVE, 0));
  }, [x, AMOUNT_TO_MOVE]);

  return (
    <div
      className="w-full pl-4 sm:container mx-auto flex gap-10 flex-col mt-20"
      ref={ref}
    >
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-[42px] leading-[42px] lg:text-[64px] lg:leading-[64px] mt-">
          Built on Nile
        </h2>
        <div className="lg:flex flex-row gap-6 hidden">
          <button className="bg-darkGray rounded-full flex items-center justify-center w-[48px] h-[48px] rotate-180">
            <Image
              src={chevron}
              alt="arrow"
              width={25.2}
              height={25.2}
              className={x === 0 ? "opacity-20" : ""}
              onClick={back}
            />
          </button>
          <button
            className="bg-darkGray rounded-full flex items-center justify-center w-[48px] h-[48px]"
            onClick={forward}
          >
            <Image
              className={
                x >= maxPosition - (ref.current?.clientWidth ?? 0)
                  ? "opacity-20"
                  : ""
              }
              src={chevron}
              alt="arrow"
              width={25.2}
              height={25.2}
            />
          </button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className="transition-transform flex flex-row align-start flex-nowrap gap-3 lg:gap-6 ease-in-out"
          style={{ transform: `translateX(-${x}px)` }}
        >
          {items.map((item) => {
            return <CarouselItem key={item.title} {...item} />;
          })}
        </div>
      </div>
      <div className="flex flex-row gap-6 lg:hidden items-center justify-center">
        <button className="bg-darkGray rounded-full flex items-center justify-center w-[48px] h-[48px] rotate-180">
          <Image
            src={chevron}
            alt="arrow"
            width={25.2}
            height={25.2}
            className={x === 0 ? "opacity-20" : ""}
            onClick={back}
          />
        </button>
        <button
          className="bg-darkGray rounded-full flex items-center justify-center w-[48px] h-[48px]"
          onClick={forward}
        >
          <Image
            className={
              x >= maxPosition - (ref.current?.clientWidth ?? 0)
                ? "opacity-20"
                : ""
            }
            src={chevron}
            alt="arrow"
            width={25.2}
            height={25.2}
          />
        </button>
      </div>
    </div>
  );
}
