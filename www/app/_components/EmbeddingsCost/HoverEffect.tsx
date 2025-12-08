'use client';
import Image from 'next/image';
import verticalLine from '@/public/vertical-line.svg';
import nileTwinkle from '@/public/nile-twinkle.svg';
import React, { useState } from 'react';
import CodeTyper from './CodeTyper';
import MobileLines from './MobileLines';

const lp = {
  color: 'white',
  text: '(',
};
const rp = {
  color: 'white',
  text: ')',
  element: 'span',
};
const lines: Array<Array<{ text: string; color: string }>> = [
  [
    { color: '#4FC1FF', text: 'CREATE TABLE ' },
    { color: '#DCDCAA', text: 'wiki_documents' },
    lp,
  ],
  [
    { color: '#9CDCFE', text: 'tenant_id uuid' },
    { color: 'white', text: ',' },
  ],
  [
    { color: '#9CDCFE', text: 'id integer' },
    { color: 'white', text: ',' },
  ],
  [
    { color: '#9CDCFE', text: 'embedding ' },
    { color: '#DCDCAA', text: 'vector' },
    lp,
    { color: '#B5CEA8', text: '3' },
    { color: 'white', text: '));' },
  ],
  [],
  [
    { color: '#4FC1FF', text: 'INSERT INTO ' },
    { color: '#DCDCAA', text: 'wiki_documents' },
    { color: 'white', text: '(' },
    { color: '#9CDCFE', text: 'tenant_id' },
    { color: 'white', text: ', ' },
    { color: '#9CDCFE', text: 'id' },
    { color: 'white', text: ', ' },
    { color: '#9CDCFE', text: 'embedding' },
    rp,
  ],
  [
    { color: '#DCDCAA', text: 'VALUES ' },
    lp,
    {
      color: 'white',
      text: "'0191c7b8-c62b-7574-b15c-35b1b6fc06fc'",
    },
    { color: 'white', text: ', ' },
    { color: '#B5CEA8', text: '1' },
    { color: 'white', text: ', ' },
    {
      color: 'white',
      text: '[',
    },
    { color: '#B5CEA8', text: '18' },
    { color: 'white', text: ', ' },
    { color: '#B5CEA8', text: '24' },
    { color: 'white', text: ', ' },
    { color: '#B5CEA8', text: '43' },
    { color: 'white', text: ']' },
    rp,
    { color: 'white', text: ';' },
  ],
  [],
  [
    { color: '#4FC1FF', text: 'SELECT ' },
    { color: '#9CDCFE', text: 'embedding' },
    { color: 'white', text: " <-> '[" },
    { color: '#B5CEA8', text: '34' },
    { color: 'white', text: ', ' },
    { color: '#B5CEA8', text: '09' },
    { color: 'white', text: ', ' },
    { color: '#B5CEA8', text: '42' },
    { color: 'white', text: "]' " },
    { color: '#4FC1FF', text: 'AS ' },
    { color: '#9CDCFE', text: 'distance ' },
    { color: '#4FC1FF', text: 'FROM ' },
  ],
  [
    { color: '#9CDCFE', text: 'wiki_documents' },
    { color: 'white', text: ';' },
  ],
];
export default function HoverEffect() {
  const [allowTyping] = useState(false);
  return (
    <div className="mx-auto -mt-6 lg:-mt-[5.6rem]">
      <div
        className="code-hover flex flex-col items-center overflow-hidden lg:max-w-xl 2xl:max-w-full"
        onMouseEnter={() => {
          // setAllowTyping(true);
        }}
        onMouseLeave={() => {
          // setAllowTyping(false);
        }}
      >
        <div className="relative flex h-[360px] w-[360px] flex-col items-center md:h-[720px] md:w-[720px]">
          <div className="relative flex h-full w-full flex-row overflow-hidden rounded-full">
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
          <div className="pointer-events-none absolute h-full w-full rounded-full bg-fade-out" />

          <div className="absolute flex h-full w-full">
            <div className="pointer-events-none flex flex-1 items-center justify-center">
              <div className="relative flex h-full w-full items-center justify-center md:ml-40 md:mt-64 md:pb-14">
                <Image
                  src={nileTwinkle}
                  alt="twinkling nile logo"
                  className="absolute left-0 top-0"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 w-full rounded-[24px] bg-[#1E1E1E] p-3 md:-mt-52">
          <div className="flex flex-row gap-1 px-3 py-2">
            <div className="h-2 w-2 rounded-full bg-[#FF5656]"></div>
            <div className="h-2 w-2 rounded-full bg-[#FFCF52]"></div>
            <div className="h-2 w-2 rounded-full bg-[#78FF57]"></div>
          </div>
          <div className="pointer-events-none hidden flex-row overflow-hidden rounded-[16px] bg-[rgba(63,63,63)] p-6 font-mono md:flex">
            <div className="relative flex flex-col">
              {Array(11)
                .fill(null)
                .map((_, lineNo) => {
                  return (
                    <div
                      key={lineNo}
                      className="absolute h-4 leading-4 text-[#D4D4D44D]"
                      style={{ top: lineNo * 18 }}
                    >
                      {lineNo + 1}
                    </div>
                  );
                })}
            </div>
            <CodeTyper lines={lines} allowTyping={allowTyping} />
          </div>
          <div className="pointer-events-none flex flex-row overflow-hidden rounded-[16px] bg-[rgba(63,63,63)] px-3 py-6 font-mono md:hidden lg:px-6">
            <MobileLines />
          </div>
        </div>
      </div>
    </div>
  );
}
