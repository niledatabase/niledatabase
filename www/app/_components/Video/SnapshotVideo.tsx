"use client";
import { useRef, useEffect, useState } from "react";
import useIntersection from "@/app/_components/common/useIntersection";

// looking to add width or height? add a poster with the size you want instead.
export default function SnapshotVideo(props: {
  src: string;
  poster: string;
  className?: string;
}) {
  const { src: _src, poster, className } = props;
  const [src, setSrc] = useState<string | undefined>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useIntersection(videoRef, {
    rootMargin: "-10px",
  });

  useEffect(() => {
    if (videoRef && videoRef.current && isVisible) {
      setSrc(`/video/${_src}`);
    }
  }, [isVisible]);

  useEffect(() => {
    if (videoRef && videoRef.current && isVisible) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [src]);

  return (
    <video
      className={className}
      muted
      ref={videoRef}
      loop
      playsInline
      poster={`/video/${poster}`}
      preload="none"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
