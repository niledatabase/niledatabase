"use client";
import { useRef } from "react";
import useIntersection from "./useIntersection";

type Props = {
  children?: JSX.Element | JSX.Element[];
  textAlign?: string;
  className?: string;
  text: string;
};
export default function Heading(props: Props) {
  const { text, children, className, textAlign = "center" } = props;
  const headerRef = useRef<HTMLDivElement>(null);
  const headerVisible = useIntersection(headerRef, { rootMargin: "-10%" });
  return (
    <div ref={headerRef}>
      <div
        className={`transition-all ${
          headerVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
        }`}
      >
        <h2
          className={`${className} leading-[64px] text-${textAlign} text-[56px] font-normal text-white `}
        >
          {text}
        </h2>
        {children}
      </div>
    </div>
  );
}
