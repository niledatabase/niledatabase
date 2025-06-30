"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@niledatabase/client";

export default function SignoutButton() {
  return (
    <Button
      variant="link"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-0"
    >
      Logout
    </Button>
  );
}
