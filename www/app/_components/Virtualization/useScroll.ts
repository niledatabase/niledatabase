'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useScroll(
  speedFactor = 0.1,
  handleScroll?: (position: number) => void,
  config?: {
    allowScroll?: boolean;
    scrollJacking?: boolean;
  },
) {
  const { allowScroll = true, scrollJacking = false } = config ?? {};
  const scrollerRef = useRef<(event: WheelEvent) => void>(() => null);
  const [prevScrollPosition, setPrevScrollPosition] = useState(
    typeof window !== 'undefined' ? window.scrollY : 0,
  );
  const scroller = useCallback(
    (event: WheelEvent) => {
      const delta = event.deltaY;
      const scrollPosition = window.scrollY + delta * speedFactor;

      if (allowScroll === false) {
        setPrevScrollPosition(scrollPosition);
        if (scrollJacking) {
          window.scrollTo({
            top: prevScrollPosition,
          });
        }
      } else {
        if (scrollJacking) {
          window.scrollTo({
            top: scrollPosition,
          });
        }
        handleScroll && handleScroll(scrollPosition);
      }
    },
    [speedFactor, allowScroll, prevScrollPosition],
  );

  useEffect(() => {
    document.removeEventListener('wheel', scrollerRef.current);
    scrollerRef.current = scroller;
    document.addEventListener('wheel', scrollerRef.current, { passive: false });
    () => {
      document.removeEventListener('wheel', scrollerRef.current);
    };
  }, [scroller]);
}
