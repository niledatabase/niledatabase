"use client";
// ^^^ this is the reason we need this wrapper component around GoogleLoginButton

import React from "react";
import Stack from "@mui/joy/Stack";
import { GoogleLoginButton, NileProvider } from "@niledatabase/react";

export default function GoogleAuthPanel() {
  console.log("GoogleAuthPanel: " + process.env.NEXT_PUBLIC_NILEDB_API_URL);
  /* Note that in this case we tell the client-side component to talk to Nile directly, not the local API. 
        This is specific for Google SSO */
  return (
    <NileProvider apiUrl={process.env.NEXT_PUBLIC_NILEDB_API_URL}>
      <div style={{ maxWidth: "20rem", margin: "0 auto" }}>
        <Stack gap={2} justifyContent="center" alignItems="center">
          <GoogleLoginButton />
        </Stack>
      </div>
    </NileProvider>
  );
}
