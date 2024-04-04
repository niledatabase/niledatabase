"use client";
// ^^^ this is the reason we need this wrapper component around GoogleLoginButton

import React from "react";
import Stack from "@mui/joy/Stack";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

import { GoogleLoginButton, NileProvider } from "@niledatabase/react";

export default function GoogleAuthPanel() {
  // handle logouts here
  const searchParams = useSearchParams();
  if (searchParams.has("logout")) {
    Cookies.remove("authData");
  }

  {
    /* Note that in this case we tell the client-side component to talk to Nile directly, not the local API. 
        This is specific for Google SSO */
  }
  return (
    <NileProvider basePath={process.env.NEXT_PUBLIC_NILE_API}>
      <div style={{ maxWidth: "20rem", margin: "0 auto" }}>
        <Stack gap={2} justifyContent="center" alignItems="center">
          <GoogleLoginButton
            workspace={process.env.NEXT_PUBLIC_WORKSPACE}
            database={process.env.NEXT_PUBLIC_DATABASE}
          />
        </Stack>
      </div>
    </NileProvider>
  );
}
