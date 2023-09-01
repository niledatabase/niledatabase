"use client";
import { useRef } from "react";
import useIntersection from "./useIntersection";

type Props = {
  children?: JSX.Element | JSX.Element[];
  textAlign?: string;
  className?: string;
  text?: string;
  rootMargin?: string;
};
export default function Heading(props: Props) {
  const {
    text,
    children,
    className,
    textAlign = "center",
    rootMargin = "-10%",
  } = props;
  const headerRef = useRef<HTMLDivElement>(null);
  const headerVisible = useIntersection(headerRef, { rootMargin });
  return (
    <div ref={headerRef} className="w-full">
      <div
        className={`transition-all ${
          headerVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
        }`}
      >
        {text && (
          <h2
            className={`${
              className ? `${className} ` : ""
            }leading-[64px] text-${textAlign} text-[56px] font-normal text-white`}
          >
            {text}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
