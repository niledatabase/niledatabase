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
  title: "Example App for RAG with Nile and OpenAI - Code Assist",
  description:
    "Built on Nile - The Postgres platform for AI-native B2B companies",
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
                src="/next.svg"
                alt="Next.js Logo"
                className={styles.logo}
                height={24}
                width={100}
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
            <Stack paddingTop={2}>
              <Typography level="h2">
                Autonomous Code Assistant - Code more, type less
              </Typography>
            </Stack>
          </div>
          {children}
          <div className={styles.grid}>
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
                href="https://www.thenile.dev/docs/getting-started/languages/nextjs"
                target="_blank"
                rel="noopener"
              >
                <Image
                  src="/next.svg"
                  alt="Next.js Logo"
                  className={styles.logo}
                  height={24}
                  width={100}
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
