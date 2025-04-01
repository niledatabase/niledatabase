"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignInForm } from "@niledatabase/react";
import { Button } from "./ui/button";

export default function BasicLoginForm() {
  const { push } = useRouter();
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-5 w-full space-y-8">
      {/* Nile's Login component calls the auth API route, which will set the right cookies. So we just need to redirect to the right page. */}
      {error && (
        <div className="text-white bg-destructive rounded-md p-2">{error}</div>
      )}
      <SignInForm
        callbackUrl="/tenants"
        onError={(resp) => {
          setError("An error has occurred. " + resp.message);
        }}
      />
      <div className="text-smi flex flex-row gap-2 items-center">
        <div>Not a user yet?</div>
        <Link href="/signup">
          <Button variant="link" className="pl-0">
            Sign up here
          </Button>
        </Link>
      </div>
    </div>
  );
}
