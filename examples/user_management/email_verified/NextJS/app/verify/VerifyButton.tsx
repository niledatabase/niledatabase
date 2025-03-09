"use client";
import { User } from "@niledatabase/server";

import { EmailSignInButton } from "@niledatabase/react";
import "@niledatabase/react/styles.css";
import { useState } from "react";

export default function VerifyButton({ me }: { me: User }) {
  const [error, setError] = useState("");
  return (
    <div className="flex flex-col gap-4 items-center">
      {error ? <div className="rounded bg-red-600/50 p-2">{error}</div> : null}
      <div>
        <EmailSignInButton
          email={me.email}
          onSent={() => {
            setError("");
          }}
          onFailure={(e) => {
            if (e) {
              setError(e.error);
            }
          }}
        />
      </div>
    </div>
  );
}
