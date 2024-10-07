"use client";
import { Google } from "@niledatabase/react";

export default function GoogleButton() {
  /* Note that in this case we tell the client-side component to talk to Nile directly, not the local API. 
        This is specific for Google SSO */
  return (
    <Google
      className="bg-[#4285f4] hover:bg-[#4285f4] pl-[3px] text-white"
      callbackUrl="/tenants"
    />
  );
}
