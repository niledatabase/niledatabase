"use client";
import { useRef, useEffect } from "react";
import useIntersection from "@/app/_components/common/useIntersection";

// looking to add width or height? add a poster with the size you want instead.
export default function SnapshotVideo(props: {
  src: string;
  poster: string;
  className?: string;
}) {
  const { src, poster, className } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useIntersection(videoRef, {
    rootMargin: "-10px",
  });

  useEffect(() => {
    if (videoRef && videoRef.current && isVisible) {
      videoRef.current.play();
    }
  }, [videoRef, isVisible]);

  return (
    <video
      className={className}
      muted
      ref={videoRef}
      loop
      playsInline
      poster={`/video/${poster}`}
    >
      <source src={`/video/${src}`} />
    </video>
  );
}
