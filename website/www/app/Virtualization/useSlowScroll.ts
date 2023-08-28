"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useSlowScroll(
  speedFactor = 0.1,
  handleScroll?: (position: number) => void,
  allowScroll?: boolean
) {
  const scrollerRef = useRef<(event: WheelEvent) => void>(() => null);
  const [prevScrollPosition, setPrevScrollPosition] = useState(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const scroller = useCallback(
    (event: WheelEvent) => {
      // Prevent default scrolling behavior
      event.preventDefault();
      if (allowScroll === false) {
        window.scrollTo({
          top: prevScrollPosition,
          // behavior: 'smooth',
        });
        return;
      }
      // Calculate the new scroll position
      const delta = event.deltaY;
      const scrollPosition = window.scrollY + delta * speedFactor;
      setPrevScrollPosition(scrollPosition);

      setPrevScrollPosition(scrollPosition);
      window.scrollTo({
        top: scrollPosition,
        // behavior: 'smooth',
      });
      handleScroll && handleScroll(scrollPosition);
    },
    [speedFactor, allowScroll, prevScrollPosition]
  );

  useEffect(() => {
    document.removeEventListener("wheel", scrollerRef.current);
    scrollerRef.current = scroller;
    document.addEventListener("wheel", scrollerRef.current, { passive: false });
    () => {
      document.removeEventListener("wheel", scrollerRef.current);
    };
  }, [scroller]);
}
