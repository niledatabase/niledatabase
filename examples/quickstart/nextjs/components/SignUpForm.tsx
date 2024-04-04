"use client";

import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Alert from "@mui/joy/Alert";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NileProvider, UserSignupForm } from "@niledatabase/react";

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();
  return (
    <NileProvider basePath={`http://localhost:3000/api`}>
      <Stack gap={2} sx={{ maxWidth: "40ch" }}>
        <Typography level="h1">Sign up</Typography>
        {error && <Alert>{error}</Alert>}
        <UserSignupForm
          onSuccess={(response) => push("/tenants")}
          onError={() => {
            setError("an error has occurred.");
          }}
        />
        <p>
          Already a user? <Link href="/">Log in here</Link>
        </p>
      </Stack>
    </NileProvider>
  );
}
