"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import { signIn } from "next-auth/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EmailIcon from "@mui/icons-material/Email";

export default function Home() {
  // This demo supports both Github and passwordless email auth.
  const authType = process.env.AUTH_TYPE;
  return (
    <div style={{ maxWidth: "20rem", margin: "0 auto" }}>
      <Stack gap={5} sx={{ maxWidth: "40rem" }} alignItems={"center"}>
        <Card variant="outlined">
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              <Button
                onClick={() => signIn("github", { callbackUrl: "/tenants" })}
                startDecorator={<GitHubIcon />}
              >
                Sign in with Github
              </Button>
            </div>
          </CardContent>
          <Divider>or</Divider>
          <CardContent>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const data: undefined | FormData = new FormData(
                  event.currentTarget
                );
                const email = data.entries().next()?.value?.[1];
                signIn("email", { email, callbackUrl: "/tenants" });
              }}
            >
              <label>
                <Typography> Email address </Typography>
                <Input type="email" id="email" name="email" />
              </label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >
                <Button type="submit" startDecorator={<AlternateEmailIcon />}>
                  Sign in with Email
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Stack>
    </div>
  );
}
