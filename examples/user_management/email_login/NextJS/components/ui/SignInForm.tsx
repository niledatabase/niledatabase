"use client";

import { SignInForm } from "@niledatabase/react";
// import "@niledatabase/react/styles.css";
import { Button } from "./button";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col gap-4 mt-24">
      <SignInForm callbackUrl="/dashboard" />
      <p>
        Not a user yet?{" "}
        <Button variant="link" className={"pl-0"}>
          <Link href="/sign-up" className="text-primary">
            Sign up here
          </Link>
        </Button>
      </p>
    </div>
  );
}
