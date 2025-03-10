"use client";
import { MouseEventHandler, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function GradientButton({
  href,
  onClick,
  type = "button",
  children,
  variant,
  className,
  subclasses: _subz,
}: {
  href?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  children: (string | JSX.Element)[] | string | JSX.Element;
  variant?: "soft" | "launch";
  className?: string;
  subclasses?: string;
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
    [href, onClick, push],
  );
  const subClasses = useMemo(() => {
    if (variant === "soft") {
      return `py-3 px-4 bg-clip-text text-transparent gradientBorderButtonFade subpixel-antialiased bg-black overflow-hidden whitespace-nowrap${
        _subz ? ` ${_subz}` : ""
      }`;
    }
    if (variant === "launch") {
      return `bg-gradient-text-144 py-3 px-4 bg-clip-text text-transparent gradientBorderButtonLaunch subpixel-antialiased bg-black overflow-hidden whitespace-nowrap${
        _subz ? ` ${_subz}` : ""
      }`;
    }
    return `py-3 px-4 rounded-[7px] text-transparent gradientBorderButton subpixel-antialiased overflow-hidden whitespace-nowrap${
      _subz ? ` ${_subz}` : ""
    }`;
  }, [_subz]);
  return (
    <button
      className={`flex-1 rounded-xl relative z-[9]${
        className ? ` ${className}` : ""
      }`}
      type={type}
      onClick={handleClick}
    >
      <div className={subClasses}>{children}</div>
    </button>
  );
}
