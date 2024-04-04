import React from "react";
import Stack from "@mui/joy/Stack";
import { GoogleLoginButton, NileProvider } from "@niledatabase/react";

export default function GoogleAuthPanel() {
  {
    /* Note that in this case we tell the client-side component to talk to Nile directly, not the local API. 
        This is specific for Google SSO */
  }
  return (
    <NileProvider>
      <div style={{ maxWidth: "20rem", margin: "0 auto" }}>
        <Stack gap={2} justifyContent="center" alignItems="center">
          <GoogleLoginButton
            workspace={process.env.REACT_PUBLIC_WORKSPACE}
            database={process.env.REACT_PUBLIC_DATABASE}
          />
        </Stack>
      </div>
    </NileProvider>
  );
}
