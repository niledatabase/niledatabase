"use client";
import Link from "next/link";
import Image from "next/image";
import "./storeScroll";
import { Links } from "./Links";
import MobileNav, { NavMenu } from "./MobileNav";
import { GithubCta } from "./GithubCta";
import GradientButton from "../GradientButton";
import { useCallback, useState } from "react";

export default function Navigation({
  className,
  dark,
}: {
  className?: string;
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <>
      <NavMenu open={open} />
      <div
        className={`flex flex-row flex-1 w-screen sticky top-0 z-30 navBlur ${className}`}
      >
        <div className="flex flex-row items-center justify-between px-10 lg:px-28 flex-1 lg:h-auto h-[76px]">
          <div className="items-center flex lg:block lg:items-start lg:w-44">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Nile Logo"
                width={80}
                height={30}
                priority
                className="m-auto scale-[1.3] lg:m-0 lg:scale-100 lg:translate-y-0"
              />
            </Link>
          </div>
          <MobileNav open={open} toggleOpen={toggleOpen} />

          <div className="hidden lg:flex flex-row">
            <div className="flex gap-8 py-5 px-2.5">
              <Links />
            </div>
          </div>
          <div className="hidden lg:show lg:flex flex-row">
            <div className="flex flex-row gap-4">
              <GithubCta />
              <GradientButton>Sign Up</GradientButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
