"use client";
import Image from "next/image";
import verticalLine from "@/public/vertical-line.svg";
import nileTwinkle from "@/public/nile-twinkle.svg";
import nileTwinkleColor from "@/public/nile-twinkle-color.svg";
import dots1 from "@/public/dots_1.svg";
import dots2 from "@/public/dots_2.svg";
import dots3 from "@/public/dots_3.svg";
import dots4 from "@/public/dots_4.svg";
import dots5 from "@/public/dots_5.svg";
import React, { useState } from "react";
import CodeTyper from "./CodeTyper";

const lp = {
  color: "white",
  text: "(",
};
const rp = {
  color: "white",
  text: ")",
  element: "span",
};
const lines: Array<Array<{ text: string; color: string }>> = [
  [
    { color: "#4FC1FF", text: "CREATE TABLE " },
    { color: "#DCDCAA", text: "wiki_documents" },
    lp,
  ],
  [
    { color: "#9CDCFE", text: "tenant_id uuid" },
    { color: "white", text: "," },
  ],
  [
    { color: "#9CDCFE", text: "id integer" },
    { color: "white", text: "," },
  ],
  [
    { color: "#9CDCFE", text: "embedding " },
    { color: "#DCDCAA", text: "vector" },
    lp,
    { color: "#B5CEA8", text: "3" },
    { color: "white", text: "));" },
  ],
  [],
  [
    { color: "#4FC1FF", text: "INSERT INTO " },
    { color: "#DCDCAA", text: "wiki_documents" },
    { color: "white", text: "(" },
    { color: "#9CDCFE", text: "tenant_id" },
    { color: "white", text: ", " },
    { color: "#9CDCFE", text: "id" },
    { color: "white", text: ", " },
    { color: "#9CDCFE", text: "embedding" },
    rp,
  ],
  [
    { color: "#DCDCAA", text: "VALUES " },
    lp,
    {
      color: "white",
      text: "'0191c7b8-c62b-7574-b15c-35b1b6fc06fc'",
    },
    { color: "white", text: ", " },
    { color: "#B5CEA8", text: "1" },
    { color: "white", text: ", " },
    {
      color: "white",
      text: "[",
    },
    { color: "#B5CEA8", text: "18" },
    { color: "white", text: ", " },
    { color: "#B5CEA8", text: "24" },
    { color: "white", text: ", " },
    { color: "#B5CEA8", text: "43" },
    { color: "white", text: "]" },
    rp,
    { color: "white", text: ";" },
  ],
  [],
  [
    { color: "#4FC1FF", text: "SELECT " },
    { color: "#9CDCFE", text: "embedding" },
    { color: "white", text: " <-> '[" },
    { color: "#B5CEA8", text: "34" },
    { color: "white", text: ", " },
    { color: "#B5CEA8", text: "09" },
    { color: "white", text: ", " },
    { color: "#B5CEA8", text: "42" },
    { color: "white", text: "]' " },
    { color: "#4FC1FF", text: "AS " },
    { color: "#9CDCFE", text: "distance " },
    { color: "#4FC1FF", text: "FROM " },
  ],
  [
    { color: "#9CDCFE", text: "wiki_documents" },
    { color: "white", text: ";" },
  ],
];
export default function HoverEffect() {
  const [allowTyping, setAllowTyping] = useState(false);
  return (
    <div className="-mt-6 lg:-mt-[5.6rem]">
      <div
        className="flex items-center flex-col code-hover overflow-hidden"
        onMouseEnter={() => {
          setAllowTyping(true);
        }}
        onMouseLeave={() => {
          setAllowTyping(false);
        }}
      >
        <div className="flex items-center flex-col relative w-[720px] h-[720px]">
          <div className="flex flex-row w-full h-full rounded-full overflow-hidden relative">
            {Array(15)
              .fill(null)
              .map((_, idx) => {
                const left = idx - 1;
                return (
                  <Image
                    key={idx}
                    src={verticalLine}
                    alt="vertical line"
                    className="absolute"
                    style={{
                      left: left * 48,
                    }}
                  />
                );
              })}
          </div>
          <div className="rounded-full absolute w-full h-full bg-fade-out pointer-events-none" />

          <div className="absolute h-full w-full flex ">
            <div className="flex flex-1 items-center justify-center pointer-events-none">
              <div className="absolute rounded-full bg-[#d9d9d9] blur-[85px] w-1/3 h-1/3 -mt-14 backdrop opacity-0"></div>
              <div className="relative pb-14 w-full h-full mt-64 ml-40">
                <Image
                  src={nileTwinkleColor}
                  alt="twinkling nile logo"
                  className="absolute top-[67px] left-[64px]"
                />
                <Image
                  src={nileTwinkle}
                  alt="twinkling nile logo"
                  className="absolute top-0 left-0 gray-logo"
                />
                <div className="absolute top-[100px] left-[97px] rotater-behind w-[213px] h-[213px] rounded-[32px] opacity-0 transition-opacity" />
                <div className="absolute top-[100px] left-[97px] rotater w-[213px] h-[213px] rounded-[32px] opacity-0 transition-opacity" />

                <div className="absolute top-[114px] left-[114px] overflow-hidden w-[175px]">
                  <div className="twinkle flex flex-row items-center">
                    <Image src={dots1} alt="twinkling nile logo" />
                    <Image src={dots2} alt="twinkling nile logo" />
                    <Image src={dots3} alt="twinkling nile logo" />
                    <Image src={dots4} alt="twinkling nile logo" />
                    <Image src={dots5} alt="twinkling nile logo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#1E1E1E] rounded-[24px] p-3 w-full -mt-52 relative z-10">
          <div className="flex flex-row gap-1 px-3 py-2">
            <div className="rounded-full bg-[#FF5656] h-2 w-2"></div>
            <div className="rounded-full bg-[#FFCF52] h-2 w-2"></div>
            <div className="rounded-full bg-[#78FF57] h-2 w-2"></div>
          </div>
          <div className=" bg-[rgba(63,63,63)] rounded-[16px] p-6 flex flex-row font-mono pointer-events-none overflow-hidden">
            <div className="flex flex-col relative">
              {Array(11)
                .fill(null)
                .map((_, lineNo) => {
                  return (
                    <div
                      key={lineNo}
                      className="leading-4 h-4 absolute text-[#D4D4D44D]"
                      style={{ top: lineNo * 18 }}
                    >
                      {lineNo + 1}
                    </div>
                  );
                })}
            </div>
            <CodeTyper lines={lines} allowTyping={allowTyping} />
          </div>
        </div>
      </div>
    </div>
  );
}
