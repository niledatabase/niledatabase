"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@niledatabase/react";

export default function SignoutButton() {
  return (
    <Button variant="link" onClick={() => signOut()} className="px-0">
      Logout
    </Button>
  );
}
