"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@niledatabase/react";

export default function SignOutButton() {
  return (
    <Button
      variant="link"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-0"
    >
      Sign out
    </Button>
  );
}
