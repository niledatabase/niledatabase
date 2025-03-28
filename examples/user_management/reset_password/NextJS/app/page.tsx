"use client";
import Link from "next/link";

import { Discord, Google, SignInForm } from "@niledatabase/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-4 items-center">
        <Discord callbackUrl="/dashboard" />
        <Google callbackUrl="/dashboard" />
        <div className="flex flex-row gap-4 items-center w-full">
          <div className="h-px bg-muted flex-1"></div>
          <div>or</div>
          <div className="h-px bg-muted flex-1"></div>
        </div>
        <SignInForm
          callbackUrl="/dashboard"
          resetUrl="/reset-password"
          className="w-[500px]"
          onSuccess={(data) => {
            console.log("yuip", data);
          }}
        />
      </div>
      <span>
        Not a user yet?{" "}
        <Link className="underline text-primary" href="/sign-up">
          Sign up here
        </Link>
      </span>
    </div>
  );
}
