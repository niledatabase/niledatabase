"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { RenderItems } from "./RenderItems";

type Props = {
  navBar: any;
  page: string;
};
const variants = {
  closed: "block h-[0px] overflow-hidden bottom-0",
  open: "block h-1/2 overflow-scroll bottom-[66px]",
};

const wrapperVariants = {
  open: "opacity-80 bg-black fixed top-0 bottom-0 left-0 right-0 z-10",
  closed: "opacity-0",
};

export default function MobileSidenav({ navBar, page }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [menuItem, setMenuItem] = useState("");
  const [activeItem, setActiveItem] = useState<HTMLDivElement>();

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

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

  const activeCallback = useCallback((page: string, thing: any) => {
    const item = document?.querySelectorAll(`a[href="${page}"]`);
    setActiveItem(item[1] as HTMLDivElement);
    setMenuItem(thing.header);
  }, []);

  useEffect(() => {
    if (ref.current && activeItem) {
      ref.current.scrollTop = activeItem?.offsetTop - 20;
    }
  }, [activeItem]);

  return (
    <div className="block lg:hidden">
      <div
        className={
          open
            ? "top-0 h-[76px] left-0 right-0 fixed z-40 opacity-80 bg-black"
            : ""
        }
        onClick={() => {
          setOpen(false);
        }}
      />
      <div
        className={open ? wrapperVariants.open : wrapperVariants.closed}
        onClick={() => {
          setOpen(false);
        }}
      />
      <aside
        ref={ref}
        className={`${
          open ? variants.open : variants.closed
        } transition-all fixed right-0 left-0 z-30`}
        onClick={() => setOpen(true)}
      >
        <div className="h-px w-full bg-divider-bold z-20 sticky top-0 left-0 right-0"></div>
        <ul className="relative">
          <div className="bg-black">
            <div className="px-4">
              <RenderItems
                items={navBar}
                page={page}
                activeCallback={activeCallback}
              />
            </div>
          </div>
        </ul>
      </aside>
      <div
        className="fixed bottom-0 right-0 left-0 z-10 bg-black h-[66px] overflow-hidden"
        onClick={toggleOpen}
      >
        <div className="h-px w-full bg-divider-bold z-10"></div>
        <div className="flex flex-row justify-between h-full items-center px-4">
          {menuItem}

          <Image
            alt="gray arrow"
            src="/icons/arrow.svg"
            width={24}
            height={24}
            className={`${
              open ? "rotate-90" : "-rotate-90 opacity-40"
            } transition-all`}
          />
        </div>
      </div>
    </div>
  );
}
