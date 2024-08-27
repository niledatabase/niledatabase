"use client";

import { Button } from "@mui/joy";
import { signOut } from "@niledatabase/react";

export default function SignoutButton() {
  return <Button onClick={() => signOut()}>Logout</Button>;
}
