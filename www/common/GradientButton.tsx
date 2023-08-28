"use client";
import { MouseEventHandler, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function GradientButton({
  href,
  onClick,
  type = "button",
  children,
}: {
  href?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  children: (string | JSX.Element)[] | string | JSX.Element;
}) {
  const { push } = useRouter();
  const handleClick = useMemo<MouseEventHandler<HTMLButtonElement> | undefined>(
    () => () => {
      if (href) {
        push(href);
      } else if (onClick) {
        onClick();
      }
    },
    [href, onClick, push]
  );
  return (
    <button className="bg-black" type={type} onClick={handleClick}>
      <div className="bg-gradient-text-144 py-3 px-4 bg-clip-text text-transparent gradientBorderButton subpixel-antialiased bg-black">
        {children}
      </div>
    </button>
  );
}
