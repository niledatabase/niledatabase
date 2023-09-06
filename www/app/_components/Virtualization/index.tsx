"use client";
import Image from "next/image";
import Videos from "./Videos";
import { useEffect, useRef, useState } from "react";
import useScroll from "./useScroll";
import useIntersection from "@/app/_components/common/useIntersection";
import Texts from "./Texts";
import Heading from "@/app/_components/common/Heading";

const timings = [5000, 9000, 10000, 9000];
export default function Virtualization() {
  const [active, setActive] = useState<number>(0);
  const [speedFactor, setSpeedFactor] = useState(1);
  const autoProgress = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersection(wrapperRef, {
    threshold: 0.8,
  });
  useScroll(speedFactor, () => null, { scrollJacking: true });
  useEffect(() => {
    if (isVisible) {
      setSpeedFactor(0.1);
      if (autoProgress) {
        clearTimeout(autoProgress.current);
      }
      const timing = timings[active];
      if (timing) {
        autoProgress.current = setTimeout(() => {
          setActive((active) => active + 1);
        }, timing);
      }
    } else {
      setSpeedFactor(1);
    }
    () => {
      if (autoProgress.current) {
        clearTimeout(autoProgress.current);
      }
    };
  }, [active, isVisible]);

  return (
    <div className="flex w-full" ref={wrapperRef}>
      <div className="w-1/2">
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-1">
            <Heading textAlign="left" text="Built-in Tenant virtualization" />
          </div>
          <Texts active={active} setActive={setActive} />
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex flex-row gap-1.5 mb-5">
          <Image
            src="/icons/nile.svg"
            alt="Nile database icon"
            width={13}
            height={20}
          />
          <span className="text-[#8B8B8B] text-sm">Nile database</span>
        </div>
        <div className="flex row gap-10 flex-wrap">
          <Videos lastActive={active} />
        </div>
      </div>
    </div>
  );
}
