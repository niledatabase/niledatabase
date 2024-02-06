"use client";

import imageZoom from "fast-image-zoom";
import { useEffect, useState } from "react";

export default function BlogImageZoom() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      imageZoom();
    }
  }, [isClient]);

  return null;
}
