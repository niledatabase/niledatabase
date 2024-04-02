"use client";

import { GoogleLoginButton, NileProvider } from "@niledatabase/react";

export default function GoogleAuthPanel() {
  return (
    <NileProvider basePath={`https://${process.env.NEXT_PUBLIC_NILEDB_API}`}>
      <GoogleLoginButton
        databaseId={process.env.NEXT_PUBLIC_NILEDB_ID}
        newTenantName="workspace"
      />
    </NileProvider>
  );
}
