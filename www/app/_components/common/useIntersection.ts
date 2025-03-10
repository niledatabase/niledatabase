"use client";
import { RefObject, useEffect, useState } from "react";

export default function useIntersection(
  element: RefObject<HTMLElement>,
  config?: { rootMargin?: string; threshold?: number }
) {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const handleObserver: IntersectionObserverCallback = ([entry]) => {
      if (isVisible !== entry.isIntersecting) {
        setState(entry.isIntersecting);
      }
    };
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: config?.rootMargin ?? "0px",
      threshold: config?.threshold ?? 0,
    });

    element.current && observer.observe(element.current);

    return () => {
      if (element.current) {
        observer.unobserve(element.current);
      }
    };
  }, [isVisible]);

  return isVisible;
}
