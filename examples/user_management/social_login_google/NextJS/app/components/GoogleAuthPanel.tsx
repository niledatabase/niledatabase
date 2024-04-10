"use client";

import React from "react";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";

import { GoogleLoginButton, NileProvider } from "@niledatabase/react";

export default function GoogleAuthPanel() {
  const [newTenant, setNewTenant] = React.useState<string | undefined>();

  return (
    <NileProvider apiUrl={process.env.NEXT_PUBLIC_NILEDB_API_URL}>
      <div style={{ maxWidth: "20rem", margin: "0 auto" }}>
        <Stack gap={2}>
          <Stack>
            <Input
              size="sm"
              placeholder="Tenant Name"
              onChange={(event) => setNewTenant(event.target.value)}
            />
          </Stack>
          <GoogleLoginButton newTenantName={newTenant} />
        </Stack>
      </div>
    </NileProvider>
  );
}
