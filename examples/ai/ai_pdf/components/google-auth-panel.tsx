"use client";

import React from "react";
import { GoogleLoginButton, NileProvider } from "@theniledev/react";

export default function GoogleAuthPanel() {
  const [newTenant, setNewTenant] = React.useState<string | undefined>();

  return (
    <NileProvider basePath={process.env.NEXT_PUBLIC_NILE_API}>
      <GoogleLoginButton
        workspace={process.env.NEXT_PUBLIC_WORKSPACE}
        database={process.env.NEXT_PUBLIC_DATABASE}
        newTenantName={newTenant}
      />
    </NileProvider>
  );
}
