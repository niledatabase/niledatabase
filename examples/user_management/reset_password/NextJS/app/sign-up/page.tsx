import { SignUpForm } from "@niledatabase/react";
import Link from "next/link";

export default async function Signup() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <SignUpForm />
      <div>
        <span>
          Have an email already?{" "}
          <Link className="underline text-primary" href="/">
            Reset your password
          </Link>
        </span>
      </div>
    </div>
  );
}
