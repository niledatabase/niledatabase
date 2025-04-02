"use client";

import { SignUpForm } from "@niledatabase/react";
import { saveUserToTenants } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Form() {
  const { push } = useRouter();
  const [error, setError] = useState("");
  return (
    <div>
      {error && (
        <div className="p-2 bg-destructive rounded-lg text-white">{error}</div>
      )}
      <SignUpForm
        onSuccess={async () => {
          const res = await saveUserToTenants();
          if (res.ok) {
            push("/tenants");
          } else {
            setError("Unable to add user to tenants.");
          }
        }}
      />
    </div>
  );
}
