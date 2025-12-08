'use client';
import Link from 'next/link';
import Image from 'next/image';
import './storeScroll';
import { Links } from './Links';
import MobileNav, { NavMenu } from './MobileNav';
import { GithubCta } from './GithubCta';
import { useCallback, useState } from 'react';
import Logo from '@/public/logo.svg';

export default function Navigation({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <>
      <NavMenu open={open} />
      <div className={`w-fill navBlur sticky top-0 z-30 ${className ?? ''}`}>
        <div className="container mx-auto flex-col justify-between lg:items-center">
          <div className="flex h-[76px] w-full flex-row items-center justify-between lg:h-auto">
            <div className="flex items-center lg:block lg:items-start">
              <Link href="/">
                <Image
                  src={Logo}
                  alt="Nile Logo"
                  width={80}
                  height={30}
                  priority
                  className="m-auto translate-x-[10px] scale-[1.3] md:scale-100 lg:m-0 lg:translate-y-0"
                  data-image-zoom-disabled
                />
              </Link>
            </div>
            <MobileNav open={open} toggleOpen={toggleOpen} />

            <div className="hidden flex-row lg:flex">
              <div className="flex px-2.5 py-6">
                <Links />
              </div>
            </div>
            <div className="lg:show hidden flex-row lg:flex">
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
