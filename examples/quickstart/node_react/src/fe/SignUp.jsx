import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpForm } from "@niledatabase/react";
import { Button } from "./components/ui/button";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  return (
    <div className="justify-center items-center flex flex-1 flex-col">
      <SignUpForm 
        redirect={false}
        onSuccess={(response) => {
          console.log("success response from signup:", response);
          navigate("/tenants");
        }}
        onError={(error) => setError(error)}
      />
      {error && (
        <div className="mt-2 text-destructive">⚠️ {error}</div>
      )}
      <p>
        Not a user yet?{" "}
        <Button variant="link" className={"pl-0"}>
          <Link to="/">Sign in here</Link>
        </Button>
      </p>
    </div>
  );
}
