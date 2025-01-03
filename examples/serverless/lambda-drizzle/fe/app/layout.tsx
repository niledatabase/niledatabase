"use client";

import "./globals.css";
import styles from "./page.module.css";
import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import Stack from "@mui/joy/Stack";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={styles.main}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <div className={styles.description}>
              <div
                style={{
                  fontSize: "18px",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Image
                  src="/lambda_logo.svg"
                  alt="Lambda Logo"
                  className={styles.logo}
                  width={40}
                  height={40}
                  style={{ marginRight: "1rem" }}
                />{" "}
                AWS Lambda
              </div>
              <Typography level="h2">Todo Application on AWS Lambda</Typography>
              <div>
                <a
                  href="https://thenile.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Created by{"    "}
                  <Image
                    src="/nile_logo.svg"
                    alt="Nile Logo"
                    className={styles.logo}
                    height={24}
                    width={100}
                  />
                </a>
              </div>
            </div>
            {pathname === "/" ? null : (
              <div className={styles.logout}>
                <Link href="/?logout" style={{ color: "black" }}>
                  [ Logout ]
                </Link>
              </div>
            )}
          </div>
          <div></div>
          {children}
          <div className="flex flex-row gap-8 p-4">
            <Card
              variant="outlined"
              sx={{
                "&:hover": {
                  boxShadow: "md",
                  borderColor: "neutral.outlinedHoverBorder",
                },
              }}
            >
              <Link
                overlay
                href="https://www.thenile.dev/docs/serverless/lambda"
                target="_blank"
                rel="noopener"
                style={{
                  fontSize: "18px",
                  alignItems: "center",
                  display: "flex",
                  color: "black",
                }}
              >
                <Image
                  src="/lambda_logo.svg"
                  alt="Lambda Logo"
                  className={styles.logo}
                  width={30}
                  height={30}
                  style={{ marginRight: "1rem" }}
                />{" "}
                AWS Lambda
              </Link>
              <CardContent>
                <Typography>Getting started guide</Typography>
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              sx={{
                "--card-padding": "1rem",
                "&:hover": {
                  boxShadow: "md",
                  borderColor: "neutral.outlinedHoverBorder",
                },
              }}
            >
              <Link
                overlay
                href="https://thenile.dev"
                target="_blank"
                rel="noopener"
              >
                <Image
                  src="/nile_logo.svg"
                  alt="Nile Logo"
                  className={styles.logo}
                  height={24}
                  width={100}
                />
              </Link>
              <CardContent>
                <Typography>Sign up to Nile</Typography>
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              sx={{
                "--card-padding": "1rem",
                "&:hover": {
                  boxShadow: "md",
                  borderColor: "neutral.outlinedHoverBorder",
                },
              }}
            >
              <Link
                overlay
                href="https://www.thenile.dev/templates"
                target="_blank"
                rel="noopener"
              >
                <Image
                  src="/nile_logo.svg"
                  alt="Nile Logo"
                  className={styles.logo}
                  height={24}
                  width={100}
                />
              </Link>
              <CardContent>
                <Typography>Try additional templates</Typography>
              </CardContent>
            </Card>
          </div>
        </main>
      </body>
    </html>
  );
}
