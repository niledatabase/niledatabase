import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nile Postgres — Built for AI-native B2B companies",
  description:
    "The Postgres platform for AI-native B2B companies. Build secure, performant, and scalable multi-tenant AI applications with world-class developer experience.",
  applicationName: "Nile postgres",
  metadataBase: new URL("https://www.thenile.dev/"),
  manifest: new URL("https://www.thenile.dev/manifest.json"),
  keywords: ["serverless", "postgres", "ai-native", "b2b", "saas", "multi-tenant"],
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
    title: "Nile Postgres — Built for AI-native B2B companies",
    siteName: "Nile Postgres — Built for AI-native B2B companies",
    description:
      "The Postgres platform for AI-native B2B companies. Build secure, performant, and scalable multi-tenant AI applications with world-class developer experience.",
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
