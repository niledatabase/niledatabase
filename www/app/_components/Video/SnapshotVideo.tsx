"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import useIntersection from "@/app/_components/common/useIntersection";

// looking to add width or height? add a poster with the size you want instead.
export default function SnapshotVideo(props: {
  src: string;
  poster: string;
  className?: string;
  baseSrc?: boolean;
}) {
  const { src: _src, poster, className, baseSrc } = props;
  const [src, setSrc] = useState<string | undefined>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useIntersection(videoRef, {
    rootMargin: "-10px",
  });

  const _baseSrc = useMemo(() => {
    if (baseSrc != null) {
      return baseSrc;
    }
    return `/video/`;
  }, []);

  useEffect(() => {
    if (videoRef && videoRef.current && isVisible) {
      setSrc(`${_baseSrc}${_src}`);
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
      poster={poster ? `${_baseSrc}${poster}` : "/video/earth.webp"}
      preload="none"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
