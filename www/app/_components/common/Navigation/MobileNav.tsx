"use client";
import { Links } from "./Links";
import GradientButton from "../GradientButton";
import Image from "next/image";
import { GithubCta } from "./GithubCta";
import { useEffect } from "react";
import Link from "next/link";

export function NavMenu({ open }: { open: boolean }) {
  return (
    <div
      className={`lg:hidden transition-all ${
        open ? "flex h-screen absolute w-screen overflow-hidden" : "hidden"
      }`}
    >
      <div className="fixed -right-[329px] -top-[197px] w-[224px] h-[534px] -rotate-45 rounded-[534px] blur-[67px] bg-brown z-30 pointer-events-none" />
      <div className="fixed opacity-50 bottom-0 -left-[69%] w-[186px] h-[710px] -rotate-45 rounded-[710px] blur-[67px] bg-blue z-30 pointer-events-none" />
      <div className="absolute top-0 right-0 z-20">
        <div className={`transition-all ${open ? "opacity-100" : "opacity-0"}`}>
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black">
            <div className="flex flex-col gap-10 py-20 px-4">
              <Links className="text-xl" />
              <div className="flex flex-row">
                <div className="w-1/2 flex">
                  <Link
                    href="http://console.thenile.dev"
                    target="_blank"
                    className="pr-2 w-full flex"
                  >
                    <GradientButton>Sign Up</GradientButton>
                  </Link>
                </div>
                <div className="w-1/2">
                  <GithubCta />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function MobileNav({
  open,
  toggleOpen,
}: {
  open: boolean;
  toggleOpen: () => void;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [open]);
  return (
    <div className="absolute top-0 right-0 lg:hidden">
      <div>
        <div className="flex flex-row gap-4 p-4">
          <Link href="http://console.thenile.dev" target="_blank">
            <GradientButton>Sign Up</GradientButton>
          </Link>
          <button className="cusor-pointer relative" onClick={toggleOpen}>
            <div className="w-[24px] h-[24px]">
              <Image
                className={`absolute opacity-${
                  open ? 100 : 0
                } transition-opacity`}
                src="/icons/close.svg"
                alt="white X"
                width={25}
                height={25}
              />
              <Image
                className={`absolute opacity-${
                  !open ? 100 : 0
                } transition-opacity`}
                src="/icons/menu.svg"
                alt="three lines"
                width={21}
                height={17}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
