import { SignInForm } from "@niledatabase/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SignInForm callbackUrl="/reset-password" />
      <span>
        Not a user yet?{" "}
        <Link className="underline text-primary" href="/sign-up">
          Sign up here
        </Link>
      </span>
      <Link className="underline text-primary" href="/forgot-password">
        I forgot my password
      </Link>
    </div>
  );
}
