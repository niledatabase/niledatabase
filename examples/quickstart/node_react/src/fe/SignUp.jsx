import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpForm } from "@niledatabase/react";
import { Button } from "./components/ui/button";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("/api/auth/providers", {
      headers: new Headers({ host: "http://localhost:3006" }),
    }).then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="justify-center items-center flex flex-1 flex-col">yeet</div>
  );
}
