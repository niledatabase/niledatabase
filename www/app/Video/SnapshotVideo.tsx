"use client";
import { useRef, useEffect, useState, RefObject } from "react";

const useIntersection = (element: RefObject<HTMLElement>) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const handleObserver: IntersectionObserverCallback = ([entry]) => {
      if (entry.isIntersecting) {
        setState(entry.isIntersecting);
        if (element.current) {
          observer.unobserve(element.current);
        }
      }
    };
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "-200px",
    });

    element.current && observer.observe(element.current);

    return () => {
      if (element.current) {
        observer.unobserve(element.current);
      }
    };
  }, []);

  return isVisible;
};
export default function SnapshotVideo(props: { src: string; poster: string }) {
  const { src, poster } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useIntersection(videoRef);

  useEffect(() => {
    if (videoRef && videoRef.current && isVisible) {
      videoRef.current.play();
    }
  }, [videoRef, isVisible]);

  return (
    <video muted ref={videoRef} loop poster={`/video/${poster}`}>
      <source src={`/video/${src}`} />
    </video>
  );
}
