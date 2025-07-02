"use client";
import { Button } from "@/components/ui/button";
import { PasswordResetRequestForm } from "@niledatabase/react";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  return (
    <div className="flex flex-col gap-4">
      And email will containing instructions on how to reset your password
      <PasswordResetRequestForm
        callbackUrl="/reset-password"
        onSuccess={() => {
          setMessage(
            "If an account was found, an email has been sent with instructions to reset your password."
          );
        }}
      />
      {message ? message : null}
      <Link className="text-5xl" href="/">
        &#128281;
      </Link>
    </div>
  );
}
