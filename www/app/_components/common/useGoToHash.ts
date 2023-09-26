"use client";

import { useEffect, useRef } from "react";

export default function useGoToHash() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (
      location.hash === "#faq" &&
      ref.current &&
      typeof "window" !== undefined
    ) {
      window.scrollTo({ top: ref.current.offsetTop });
    }
  }, []);
  return ref;
}
