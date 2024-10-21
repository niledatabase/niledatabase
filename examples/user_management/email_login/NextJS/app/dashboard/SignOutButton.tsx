"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@niledatabase/react";

export default function SignOutButton({
  text = "Sign out",
}: {
  text?: string;
}) {
  return (
    <Button
      variant="link"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-0"
    >
      {text}
    </Button>
  );
}
