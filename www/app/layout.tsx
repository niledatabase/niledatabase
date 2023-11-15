import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nile Database — Serverless Postgres for modern SaaS",
  description:
    "Serverless Postgres build with multi-tenacy at it's core. Fault tolerant, globally distrubted, with user and tenant management built in.",
  applicationName: "Nile database",
  metadataBase: new URL("https://www.thenile.dev/"),
  manifest: new URL("https://www.thenile.dev/manifest.json"),
  keywords: ["serverless", "postgres", "tenant aware", "multi tenant database"],
  colorScheme: "dark",
  creator: "Nile database",
  publisher: "Nile database",
  icons: [
    {
      url: "https://www.thenile.dev/favicon.ico",
      sizes: "any",
      rel: "image/x-icon",
    },
    {
      url: "https://www.thenile.dev/apple-icon.png",
      type: "image/png",
    },
    {
      url: "https://www.thenile.dev/icon.png",
      type: "image/png",
    },
  ],
  openGraph: {
    type: "website",
    url: new URL("https://www.thenile.dev/"),
    images: "https://www.thenile.dev/opengraph/nile.jpg",
    title: "Nile Database — Serverless Postgres for modern SaaS",
    siteName: "Nile Database — Serverless Postgres for modern SaaS",
    description:
      "Serverless Postgres build with multi-tenacy at it's core. Fault tolerant, globally distrubted, with user and tenant management built in.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@niledatabase",
    creator: "@niledatabase",
    images: "https://thenile.dev/opengraph/nile.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html lang="en">{children}</html>;
}
