'use client';
import Heading from '@/app/_components/common/Heading';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import faqs from './faqs';
import Arrow from '@/public/icons/arrow.svg';
import useGoToHash from '@/app/_components/common/useGoToHash';
const variants = {
  open: '!h-auto',
  closed: 'opacity-60 hover:opacity-100',
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
  const [headerHeight, setHeader] = useState<string | Element>('');
  const classes = variants[show ? 'open' : 'closed'];
  const rows = useMemo(() => {
    if (typeof document !== 'undefined') {
      const canvas = document.createElement('canvas');
      const canvasContext = canvas.getContext('2d');
      if (canvasContext) {
        canvasContext.font = '18px Roboto';
        const result = canvasContext.measureText(String(headerHeight)).width;
        return Math.ceil((result + PADDING) / window.innerWidth);
      }
    }
    return 1;
  }, [headerHeight]);
  return (
    <div
      onClick={toggleShow}
      className={`overflow-hidden transition-all ${classes} flex cursor-pointer flex-col items-start rounded-[12px] border border-gray px-[20px] py-[16px]`}
      style={{
        height: `${Math.max(62, 48 * rows)}px`,
      }}
    >
      <div className="flex w-full flex-row items-center justify-between">
        <span
          className="text-[16px] leading-[16px] lg:text-[20px] lg:leading-[20px]"
          ref={(node) => {
            if (node) {
              setHeader(header as unknown as Element);
            }
          }}
        >
          {header}
        </span>
        <Image
          className={`transition-all ${show ? 'rotate-90' : 'rotate-0'}`}
          src={Arrow}
          alt="arrow"
          width={25}
          height={30}
          priority
        />
      </div>
      <div
        className={`${show ? 'visible' : 'invisible'} text-[18px] opacity-60`}
      >
        {content}
      </div>
    </div>
  );
};

export default function FAQ() {
  const ref = useGoToHash({ hash: '#faq' });
  return (
    <div className="container mx-auto mt-24">
      <div className="pb-0 md:px-4 md:py-4 2xl:px-24 2xl:py-4">
        <Heading text="Frequently Asked Questions" />
        <a href="#faq" ref={ref}></a>
        <div className="mt-10 flex flex-col gap-4">
          {faqs.map(({ header, content }) => {
            return (
              <ExpandItem key={header} header={header} content={content} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
