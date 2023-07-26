import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const aeonik = localFont({
  src: "../public/fonts/Aeonik-Regular.woff2",
  display: "swap",
  variable: "--font-aeonik",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nile Database",
  description: "Serverless postgres for Modern SaaS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll="0">
      <body className={`${aeonik.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
