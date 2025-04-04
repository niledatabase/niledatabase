import React from "react";
import { Link } from "react-router-dom";
import { SignInForm } from "@niledatabase/react";
import { Button } from "./components/ui/button";

export default function Auth() {
  return (
    <div className="justify-center items-center flex flex-1 flex-col gap-4 mt-30">
      <SignInForm callbackUrl="/tenants" />
      <p>
        Not a user yet?{" "}
        <Button variant="link" className={"pl-0"}>
          <Link to="/sign-up">Sign up here</Link>
        </Button>
      </p>
    </div>
  );
}
