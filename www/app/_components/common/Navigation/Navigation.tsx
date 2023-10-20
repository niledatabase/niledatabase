"use client";
import Link from "next/link";
import Image from "next/image";
import "./storeScroll";
import { Links } from "./Links";
import MobileNav, { NavMenu } from "./MobileNav";
import { GithubCta } from "./GithubCta";
import { useCallback, useState } from "react";

export default function Navigation({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <>
      <NavMenu open={open} />
      <div className={`w-screen sticky top-0 z-30 navBlur ${className ?? ""}`}>
        <div className="flex flex-col lg:items-center justify-between px-4 pb-0 2xl:px-24 container mx-auto">
          <div className="flex flex-row items-center justify-between w-full lg:h-auto h-[76px]">
            <div className="items-center flex lg:block lg:items-start lg:w-44">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="Nile Logo"
                  width={80}
                  height={30}
                  priority
                  className="m-auto scale-[1.3] translate-x-[10px] lg:m-0 lg:scale-100 lg:translate-y-0"
                />
              </Link>
            </div>
            <MobileNav open={open} toggleOpen={toggleOpen} />

            <div className="hidden lg:flex flex-row">
              <div className="flex gap-8 py-5 px-2.5">
                <Links className="font-semibold" />
              </div>
            </div>
            <div className="hidden lg:show lg:flex flex-row">
              <div className="flex flex-row gap-4">
                <GithubCta />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
