"use client";
import Link from "next/link";
import Image from "next/image";
// import "./storeScroll";
import { Links } from "./Links";
import MobileNav, { NavMenu } from "./MobileNav";
import { GithubCta } from "./GithubCta";
import { useCallback, useState } from "react";
import Logo from "@/public/logo.svg";

export default function Navigation({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <>
      <NavMenu open={open} />
      <div className={`w-fill sticky top-0 z-30 navBlur ${className ?? ""}`}>
        <div className="container flex flex-col justify-between px-4 pb-0 mx-auto lg:items-center 2xl:px-24">
          <div className="flex flex-row items-center justify-between w-full lg:h-auto h-[76px]">
            <div className="flex items-center lg:block lg:items-start lg:w-44">
              <Link href="/">
                <Image
                  src={Logo}
                  alt="Nile Logo"
                  width={80}
                  height={30}
                  priority
                  className="m-auto scale-[1.3] translate-x-[10px] lg:m-0 lg:scale-100 lg:translate-y-0"
                  data-image-zoom-disabled
                />
              </Link>
            </div>
            <MobileNav open={open} toggleOpen={toggleOpen} />

            <div className="flex-row hidden lg:flex">
              <div className="flex gap-8 py-5 px-2.5">
                <Links />
              </div>
            </div>
            <div className="flex-row hidden lg:show lg:flex">
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
