"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@niledatabase/react";
export default function SignOut() {
  return <Button onClick={() => signOut()}>Sign out</Button>;
}
