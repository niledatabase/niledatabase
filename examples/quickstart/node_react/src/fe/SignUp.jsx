import React from "react";
import { Link } from "react-router-dom";
import { SignUpForm } from "@niledatabase/react";
import { Button } from "./components/ui/button";

export default function SignUp() {
  console.log("wtf");
  return (
    <div className="justify-center items-center flex flex-1 flex-col">
      <SignUpForm callbackUrl="/tenants" />
      <p>
        Not a user yet?{" "}
        <Button variant="link" className={"pl-0"}>
          <Link to="/">Sign in here</Link>
        </Button>
      </p>
    </div>
  );
}
