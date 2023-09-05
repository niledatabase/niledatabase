'use client';

import { GoogleLoginButton, NileProvider } from "@theniledev/react";

export default function GoogleAuthPanel() {
  return (
    <NileProvider
      basePath={String(process.env.NILE_BASE_PATH)}
    >
      <GoogleLoginButton
        workspace={String(process.env.WORKSPACE)}
        database={String(process.env.DATABASE)}
      />
    </NileProvider>
  )
}
