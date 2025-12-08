'use client';
import { useRef } from 'react';
import useIntersection from './useIntersection';

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
    textAlign = 'center',
    rootMargin = '-10%',
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
            ? 'translate-y-0 opacity-100'
            : 'translate-y-6 opacity-0'
        }`}
      >
        {text && (
          <h2
            className={`${
              className ? `${className} ` : ''
            }text-white text-[26px] leading-[32px] lg:text-[45px] lg:leading-[51px] ${
              textAlign === 'left'
                ? 'text-left'
                : 'lg:text- text-center' + textAlign
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
