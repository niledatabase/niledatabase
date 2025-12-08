'use client';
import { Links } from './Links';
import Image from 'next/image';
import { GithubCta } from './GithubCta';
import { useEffect } from 'react';
import Close from '@/public/icons/close.svg';
import Menu from '@/public/icons/menu.svg';
export function NavMenu({ open }: { open: boolean }) {
  return (
    <div
      className={`transition-all lg:hidden ${
        open ? 'absolute flex h-screen w-screen overflow-hidden' : 'hidden'
      }`}
    >
      <div className="fixed right-0 top-0 z-20">
        <div className={`transition-all ${open ? 'opacity-100' : 'opacity-0'}`}>
          <div className="fixed bottom-0 left-0 right-0 top-0 bg-[#000]">
            <div className="flex flex-col gap-10 px-4 pt-20">
              <div className="flex flex-row">
                <GithubCta />
              </div>
              <Links className="text-xl font-semibold" />
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
  useEffect(() => {}, [open]);
  return (
    <div className="lg:hidden">
      <div>
        <div className="flex flex-row gap-4 p-4">
          <button className="cusor-pointer relative" onClick={toggleOpen}>
            <div className="h-[24px] w-[24px]">
              <Image
                className={`absolute opacity-${
                  open ? 100 : 0
                } transition-opacity`}
                src={Close}
                alt="white X"
                width={25}
                height={25}
              />
              <Image
                className={`absolute opacity-${
                  !open ? 100 : 0
                } transition-opacity`}
                src={Menu}
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
