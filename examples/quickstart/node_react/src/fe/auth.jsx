import React from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";
import GoogleAuthPanel from "./GoogleSSOForm.tsx";
import BasicLoginForm from "./BasicLoginForm.tsx";

export default function Auth() {
  // handle logouts here
  const [searchParams] = useSearchParams();
  if (searchParams.has("logout")) {
    Cookies.remove("authData");
  }

  if (process.env.REACT_APP_AUTH_TYPE === "google") {
    return <GoogleAuthPanel />;
  } else {
    return <BasicLoginForm />;
  }
}
