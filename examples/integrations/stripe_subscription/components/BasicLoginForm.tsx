"use client";
// ^^^ this is the reason we need this wrapper component around GoogleLoginButton

import React from "react";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Alert from "@mui/joy/Alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserLoginForm, NileProvider } from "@niledatabase/react";

export default function BasicLoginForm() {
  const { push } = useRouter();
  const [error, setError] = useState<string | null>(null);
  return (
    <NileProvider appUrl={process.env.NEXT_PUBLIC_APP_URL}>
      <div style={{ maxWidth: "20rem", margin: "0 auto" }}>
        <Stack gap={2} justifyContent="center" alignItems="center">
          {/* Nile's Login component calls the auth API route, which will set the right cookies. So we just need to redirect to the right page. */}
          {error && <Alert>{error}</Alert>}
          <UserLoginForm
            onSuccess={(resp) => push("/tenants")}
            onError={(resp) => {
              setError("An error has occurred. " + resp.message);
            }}
          />
          <Typography>
            Not a user yet? <Link href="/signup">Sign up here</Link>
          </Typography>
        </Stack>
      </div>
    </NileProvider>
  );
}
