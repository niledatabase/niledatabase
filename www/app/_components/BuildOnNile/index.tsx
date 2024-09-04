"use client";
import Image from "next/image";
import arrow from "@/public/icons/arrow.svg";
import { useCallback, useRef, useState } from "react";
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
    <div className="w-[388px] h-[472px] bg-gray rounded-xl overflow-hidden justify-between shrink-0">
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
const FULL_ITEM_WIDTH = 388 + 24;
const AMOUNT_TO_MOVE = FULL_ITEM_WIDTH * 3 + 48;

export default function BuiltOnNile() {
  const [x, setX] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const maxPosition = items.length * FULL_ITEM_WIDTH + 48;

  const forward = useCallback(() => {
    const containerWidth = ref.current?.clientWidth ?? 0;
    console.log(maxPosition, containerWidth);
    setX(Math.min(x + AMOUNT_TO_MOVE, maxPosition - containerWidth));
  }, [x]);

  const back = useCallback(() => {
    setX(Math.max(x - AMOUNT_TO_MOVE, 0));
  }, [x]);

  return (
    <div className="container mx-auto flex gap-10 flex-col" ref={ref}>
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-[64px]">Built on Nile</h2>
        <div className="flex flex-row gap-6">
          <button className="bg-darkGray rounded-full flex items-center justify-center w-[48px] h-[48px] rotate-180">
            <Image
              src={arrow}
              alt="arrow"
              width={48}
              height={48}
              className={x === 0 ? "opacity-20" : ""}
              onClick={back}
            />
          </button>
          <button
            className="bg-darkGray rounded-full flex items-center justify-center w-[48px] h-[48px]"
            onClick={forward}
          >
            <Image src={arrow} alt="arrow" width={48} height={48} />
          </button>
        </div>
      </div>
      <div className=" overflow-hidden ">
        <div
          className="transition-transform flex flex-row align-start flex-nowrap gap-6"
          style={{ transform: `translateX(-${x}px)` }}
        >
          {items.map((item) => {
            return <CarouselItem key={item.title} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
}
