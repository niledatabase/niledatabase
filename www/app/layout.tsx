import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nile Database",
  description: "Serverless Postgres for modern SaaS",
  metadataBase: new URL("https://www.thenile.dev/"),
  openGraph: {
    images: "/opengraph/nile.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html lang="en">{children}</html>;
}
