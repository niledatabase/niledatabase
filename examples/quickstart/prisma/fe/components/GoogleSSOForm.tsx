"use client";
// ^^^ this is the reason we need this wrapper component around GoogleLoginButton
import { Google } from "@niledatabase/react";
import React from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

export default function GoogleAuthPanel() {
  // handle logouts here
  const searchParams = useSearchParams();
  if (searchParams.has("logout")) {
    Cookies.remove("authData");
  }

  return (
    <Google
      className="bg-[#4285f4] hover:bg-[#4285f4] pl-[3px] text-white gap-4"
      callbackUrl="/directions"
    />
  );
}