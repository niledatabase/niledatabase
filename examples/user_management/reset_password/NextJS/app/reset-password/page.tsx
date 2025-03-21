"use client";
import { PasswordResetForm } from "@niledatabase/react";
import Link from "next/link";
import { useState } from "react";
export default function ResetPasswordPage() {
  const [success, setSuccess] = useState(false);
  return (
    <div className="flex flex-col items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {success ? (
        <div className="p-4 rounded-lg bg-green-200">
          Your password has been reset, you may now{" "}
          <Link className="underline  hover:opacity-70" href="/signin">
            sign in
          </Link>
        </div>
      ) : null}

      <div className="flex flex-row gap-4">
        <PasswordResetForm
          onSuccess={() => {
            setSuccess(true);
          }}
        />
      </div>
    </div>
  );
}
