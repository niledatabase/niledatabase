"use client";
// ^^^ this is the reason we need this wrapper component around GoogleLoginButton
import { Google } from "@niledatabase/react";
import React from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Create a separate client component for the search params logic
function GoogleAuthContent() {
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

// Main component with Suspense boundary
export default function GoogleAuthPanel() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleAuthContent />
    </Suspense>
  );
}
