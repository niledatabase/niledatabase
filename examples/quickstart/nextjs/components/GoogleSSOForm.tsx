"use client";
import Stack from "@mui/joy/Stack";
import { NileProvider, Google } from "@niledatabase/react";

export default function GoogleAuthPanel() {
  /* Note that in this case we tell the client-side component to talk to Nile directly, not the local API. 
        This is specific for Google SSO */
  return (
    <NileProvider apiUrl={process.env.NEXT_PUBLIC_NILEDB_API}>
      <div style={{ maxWidth: "20rem", margin: "0 auto" }}>
        <Stack gap={2} justifyContent="center" alignItems="center">
          <Google callbackUrl="/tenants" />
        </Stack>
      </div>
    </NileProvider>
  );
}
