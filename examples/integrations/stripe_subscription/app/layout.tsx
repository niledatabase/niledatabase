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

export const metadata: Metadata = {
  title: "SaaS B2B subscription billing with Stripe",
  description:
    "Example SaaS with paid subscriptions using Nile, NextJS and Stripe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={styles.main}>
          <div className={styles.description}>
            <div>
              <Image
                src="/Stripe.svg"
                alt="Stripe Logo"
                className={styles.logo}
                width={100}
                height={40}
              />
            </div>
            <div>
              <a
                href="https://thenile.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Created by{" "}
                <Image
                  src="/nile_logo.svg"
                  alt="Nile Logo"
                  className={styles.vercelLogo}
                  width={100}
                  height={24}
                  priority
                />
              </a>
            </div>
          </div>
          <div>
            <Stack>
              <Typography level="h2">
                SaaS B2B subscription billing with Stripe
              </Typography>
            </Stack>
          </div>
          {children}
          <div className={styles.grid}>
            <Card
              variant="outlined"
              sx={{
                "&:hover": {
                  boxShadow: "md",
                  borderColor: "neutral.outlinedHoverBorder",
                },
              }}
            >
              {/* TODO: fix link to docs */}
              <Link
                overlay
                href="https://www.thenile.dev/docs/getting-started/"
                target="_blank"
                rel="noopener"
              >
                <Image
                  src="/Stripe.svg"
                  alt="Stripe Logo"
                  className={styles.logo}
                  width={100}
                  height={40}
                />
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
