"use client";

import { GoogleLoginButton, NileProvider } from "@niledatabase/react";

export default function GoogleAuthPanel() {
  return (
    <NileProvider apiUrl={`https://${process.env.NEXT_PUBLIC_NILEDB_API_URL}`}>
      <GoogleLoginButton newTenantName="workspace" />
    </NileProvider>
  );
}
