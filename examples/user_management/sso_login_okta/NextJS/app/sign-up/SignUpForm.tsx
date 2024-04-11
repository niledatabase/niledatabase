"use client";

import { NileProvider, UserSignupForm } from "@niledatabase/react";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const { push } = useRouter();
  return (
    <NileProvider appUrl={process.env.NEXT_PUBLIC_APP_URL}>
      <Stack gap={2} sx={{ maxWidth: "40ch" }}>
        <Typography level="h1">Sign up</Typography>
        <UserSignupForm
          attributes={[
            {
              name: "newTenant",
              label: "Tenant Name",
              //@ts-ignore // TODO: can't figure out how to import the type definition
              type: "text",
              defaultValue: "",
              required: false,
            },
          ]}
          onSuccess={() => {
            push("/");
          }}
        />
        <p>
          Already a user? <Link href="/">Log in here</Link>
        </p>
      </Stack>
    </NileProvider>
  );
}
