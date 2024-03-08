import { Medal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
// import Image from "next/image";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

const MarketingPage = () => {
  configureNile(cookies().get("authData"), null);
  console.log("showing tenants page for user: " + nile.userId);
  console.log(nile.userId);
  return (
    <div className="flex items-center justify-between flex-col">
      <div className={cn("flex items-center justify-center flex-col")}>
        <h1 className="text-3xl md:text-6xl text-center mb-6 font-switzerBold">
          Chatty helps team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          work forward.
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto font-switzerRegular"
        )}
      >
        Every Resource you need in one place
      </div>
      {/* {nile.userId ? (
        <Button size="lg" asChild className="mt-5">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <Button size="sm" asChild className="mt-5">
          <Link href="/sign-up">Get Chatty for free</Link>
        </Button>
      )} */}
      <Button size="sm" asChild className="mt-5">
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
