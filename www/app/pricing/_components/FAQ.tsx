"use client";
import Heading from "@/app/_components/common/Heading";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import faqs from "./faqs";
import useGoToHash from "@/app/_components/common/useGoToHash";
const variants = {
  open: "!h-auto",
  closed: "opacity-60 hover:opacity-100",
};

const PADDING = 72;
const ExpandItem = (props: {
  header: JSX.Element | string;
  content: JSX.Element | string;
}) => {
  const [show, setShow] = useState(false);
  const toggleShow = useCallback(() => {
    return setShow(!show);
  }, [show]);
  const { header, content } = props;
  const [headerHeight, setHeader] = useState<string | Element>("");
  const classes = variants[show ? "open" : "closed"];
  const rows = useMemo(() => {
    if (typeof document !== "undefined") {
      const canvas = document.createElement("canvas");
      const canvasContext = canvas.getContext("2d");
      if (canvasContext) {
        canvasContext.font = "18px Roboto";
        const result = canvasContext.measureText(String(headerHeight)).width;
        return Math.ceil((result + PADDING) / window.innerWidth);
      }
    }
    return 1;
  }, [headerHeight]);
  return (
    <div
      onClick={toggleShow}
      className={`overflow-hidden transition-all ${classes} flex flex-col  border border-gray rounded-[12px] px-[20px] py-[16px] items-start cursor-pointer`}
      style={{
        height: `${Math.max(62, 48 * rows)}px`,
      }}
    >
      <div className="flex flex-row w-full justify-between">
        <span
          className="text-[20px]"
          ref={(node) => {
            if (node) {
              setHeader(header as unknown as Element);
            }
          }}
        >
          {header}
        </span>
        <Image
          className={`transition-all ${show ? "rotate-90" : "rotate-0"}`}
          src="/icons/arrow.svg"
          alt="arrow"
          width={25}
          height={30}
          priority
        />
      </div>
      <div
        className={`${show ? "visible" : "invisible"} opacity-60 text-[18px]`}
      >
        {content}
      </div>
    </div>
  );
};

export default function FAQ() {
  const ref = useGoToHash();
  return (
    <div className="mt-24">
      <Heading text="Frequently Asked Questions" />
      <a href="#faq" ref={ref}></a>
      <div className="flex gap-4 flex-col mt-10">
        {faqs.map(({ header, content }) => {
          return <ExpandItem key={header} header={header} content={content} />;
        })}
      </div>
    </div>
  );
}
