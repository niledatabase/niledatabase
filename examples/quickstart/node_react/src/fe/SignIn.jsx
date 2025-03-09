import React from "react";
import Cookies from "js-cookie";
import { useSearchParams, Link } from "react-router-dom";
import { Google, SignInForm } from "@niledatabase/react";
import { Button } from "./components/ui/button";

export default function Auth() {
  // handle logouts here
  const [searchParams] = useSearchParams();
  if (searchParams.has("logout")) {
    Cookies.remove("authData");
  }

  if (process.env.REACT_APP_AUTH_TYPE === "google") {
    return (
      <div className="justify-center items-center flex flex-1">
        <Google />
      </div>
    );
  }

  return (
    <div className="justify-center items-center flex flex-1 flex-col">
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
