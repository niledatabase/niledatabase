"use client";
import { useRef } from "react";
import useIntersection from "./useIntersection";

type Props = {
  children?: JSX.Element | JSX.Element[];
  textAlign?: string;
  className?: string;
  text?: string;
  rootMargin?: string;
  forceVisible?: boolean;
};

export default function Heading(props: Props) {
  const {
    text,
    children,
    className,
    textAlign = "center",
    rootMargin = "-10%",
    forceVisible,
  } = props;
  const headerRef = useRef<HTMLDivElement>(null);
  const headerVisible =
    forceVisible ?? useIntersection(headerRef, { rootMargin });
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
            }text-white leading-[32px] text-[26px] lg:leading-[51px] lg:text-[45px] ${
              textAlign === "left"
                ? "text-left"
                : "text-center lg:text-" + textAlign
            }`}
          >
            {text}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
