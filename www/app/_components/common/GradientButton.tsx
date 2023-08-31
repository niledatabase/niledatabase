"use client";
import { MouseEventHandler, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function GradientButton({
  href,
  onClick,
  type = "button",
  children,
  variant,
}: {
  href?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  children: (string | JSX.Element)[] | string | JSX.Element;
  variant?: "soft";
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
  const subClasses = useMemo(() => {
    if (variant === "soft") {
      return "py-3 px-4 bg-clip-text text-transparent gradientBorderButtonFade subpixel-antialiased bg-black overflow-hidden whitespace-nowrap";
    }
    return "bg-gradient-text-144 py-3 px-4 bg-clip-text text-transparent gradientBorderButton subpixel-antialiased bg-black overflow-hidden whitespace-nowrap";
  }, []);
  return (
    <button className="bg-black rounded-xl" type={type} onClick={handleClick}>
      <div className={subClasses}>{children}</div>
    </button>
  );
}
