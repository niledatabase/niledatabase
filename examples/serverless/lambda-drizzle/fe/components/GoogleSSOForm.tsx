"use client";

import { Google } from "@niledatabase/react";
import React from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

export default function GoogleAuthPanel() {
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    // Check if the current URL includes ?logout
    if (window.location.search.includes('logout')) {
      Cookies.remove("authData");
      // Optionally, redirect to clean URL
      router.replace(pathname);
    }
  }, [pathname, router]);

  return (
    <Google
      className="bg-[#4285f4] hover:bg-[#4285f4] pl-[3px] text-white gap-4"
      callbackUrl="/directions"
    />
  );
}
