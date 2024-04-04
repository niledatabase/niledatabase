"use client";
// ^^^ this is the reason we need this wrapper component around GoogleLoginButton

import React from "react";
import Stack from "@mui/joy/Stack";
import { GoogleLoginButton, NileProvider } from "@niledatabase/react";

export default function GoogleAuthPanel() {
  /* Note that in this case we tell the client-side component to talk to Nile directly, not the local API. 
        This is specific for Google SSO */
  return (
    <NileProvider basePath={`https://${process.env.NEXT_PUBLIC_NILEDB_API}`}>
      <div style={{ maxWidth: "20rem", margin: "0 auto" }}>
        <Stack gap={2} justifyContent="center" alignItems="center">
          <GoogleLoginButton databaseId={process.env.NEXT_PUBLIC_NILEDB_ID} />
        </Stack>
      </div>
    </NileProvider>
  );
}
