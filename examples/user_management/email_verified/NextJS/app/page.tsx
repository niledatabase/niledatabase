"use client";
import { EmailSignIn, SignInForm } from "@niledatabase/react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [success, setSuccess] = useState(false);
  return (
    <div className="container mx-auto p-12 pt-20 gap-8 flex flex-col items-center">
      <div className="flex flex-row gap-10">
        <div className="border-slate-400 rounded-lg border p-10 flex flex-col gap-10">
          <div
            className="transition-opacity mx-auto w-96 p-10 border border-slate-800 rounded-lg"
            style={{ opacity: success ? 1 : 0 }}
          >
            <div className="text-xl">Check your email</div>
            <div>An email has been sent with a link to log in.</div>
          </div>
          <div className="text-3xl">Sign up using email</div>
          <div className="w-96">
            <EmailSignIn
              callbackUrl="http://localhost:3000/success"
              onSuccess={() => {
                setSuccess(true);
              }}
              onError={(err) => {
                alert(err);
              }}
            />
          </div>
        </div>
        <div className="border-slate-400 rounded-lg border p-10 flex flex-col gap-10 justify-between space-y-2">
          <div>
            If a user has not verified their email, signing in will prompt them
            to do so.
          </div>
          <div className="w-96 self-center space-y-8">
            <SignInForm callbackUrl="http://localhost:3000/verify" />
          </div>
        </div>
      </div>
      <div>
        New user?{" "}
        <Link href="/sign-up">
          <button className="text-primary hover:underline">Sign up here</button>
        </Link>
      </div>
    </div>
  );
}
