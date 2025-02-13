"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpForm } from "@niledatabase/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();
  return (
    <div className="flex flex-col gap-5 space-y-8">
      {error && (
        <div className="text-white bg-destructive rounded-lg p-4">{error}</div>
      )}
      <SignUpForm
        onSuccess={(response) => {
          if (response.ok) {
            push("/tenants");
          } else {
            response.text().then((errorstr) => {
            setError("an error has occurred: " + errorstr);
          });
        }}}
        onError={(e) => {
          setError("an error has occurred.");
        }}
      />
      <div className="text-sm">
        Already a user?{" "}
        <Link href="/" className="hover:underline">
          <Button variant="link" className="pl-0">
            Log in here
          </Button>
        </Link>
      </div>
    </div>
  );
}
