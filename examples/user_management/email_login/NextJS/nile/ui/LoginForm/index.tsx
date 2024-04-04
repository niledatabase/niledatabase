"use client";

import { UserLoginForm } from "@niledatabase/react";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import { useRouter } from "next/navigation";

import NileContext from "@/nile/ui/NileContext";

export default function Login() {
  const { push } = useRouter();
  return (
    <NileContext>
      <Stack gap={2}>
        <UserLoginForm onSuccess={(response) => push("/dashboard")} />
        <p>
          Not a user yet? <Link href="/sign-up">Sign up here</Link>
        </p>
      </Stack>
    </NileContext>
  );
}
