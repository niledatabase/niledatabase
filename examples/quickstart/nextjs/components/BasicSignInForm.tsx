"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignInForm } from "@niledatabase/react";

export default function BasicLoginForm() {
  const { push } = useRouter();
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Nile's Login component calls the auth API route, which will set the right cookies. So we just need to redirect to the right page. */}
      {error && (
        <div className="text-white bg-destructive rounded-md p-2">{error}</div>
      )}
      <SignInForm
        callbackUrl="/tenants"
        onSuccess={(resp) => push("/tenants")}
        onError={(resp) => {
          setError("An error has occurred. " + resp.message);
        }}
      />
      <div className="text-sm">
        Not a user yet?{" "}
        <Link className="hover:underline" href="/signup">
          Sign up here
        </Link>
      </div>
    </div>
  );
}
