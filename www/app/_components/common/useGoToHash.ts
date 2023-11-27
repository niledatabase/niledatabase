"use client";

import { useEffect, useRef } from "react";

// only the last one of these in the dom will do the scroll.
export default function useGoToHash(config?: { offset?: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const offset = config?.offset ?? 0;
  useEffect(() => {
    if (ref.current && typeof "window" !== undefined) {
      window.scrollTo({
        top: ref.current.offsetTop + offset,
      });
    }
  }, [offset]);
  return ref;
}
