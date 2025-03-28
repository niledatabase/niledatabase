"use client";
import { EmailSignInButton } from "@niledatabase/react";
import { useState } from "react";

export default function VerifyEmailButton({ email }: { email: string }) {
  const [error, setError] = useState("");
  return (
    <>
      {error ? (
        <div className="rounded-lg p-4 bg-red-700 text-white">{error}</div>
      ) : null}
      <EmailSignInButton
        buttonText="Verify email address"
        email={email}
        onFailure={(err) => {
          if (err) {
            setError(err?.error);
          }
        }}
      />
    </>
  );
}
