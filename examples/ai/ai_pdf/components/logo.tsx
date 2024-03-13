import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 flex">
        <Image
          src="/logo.svg"
          alt="Logo"
          height={30}
          width={30}
          className="bg-white"
        />
        <p className={cn("text-lg text-primary pb-1 font-switzerBold")}>
          Chatty
        </p>
      </div>
    </Link>
  );
};
