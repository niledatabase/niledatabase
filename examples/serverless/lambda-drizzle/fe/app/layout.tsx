"use client";

import "./globals.css";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";

import styles from "./page.module.css";
import Link from "next/link";
import { SignOutButton } from "@niledatabase/react";
function Card({ children }: { children: JSX.Element }) {
  return (
    <div className="p-4 hover:shadow-lg hover:border-gray-700 border border-gray-600 rounded-lg w-60 transition-all">
      {children}
    </div>
  );
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen flex items-center flex-col">
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <div className="bg-black text-white border-b-px flex flex-row justify-between w-full items-center px-6 py-4">
              <div className="container mx-auto">
                <div className="flex space-between items-center w-full">
                  <div className="flex items-center text-lg">
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
                  <div className="text-4xl flex-1 text-center">
                    Yet Another Todo Application
                  </div>
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
              </div>
              {pathname === "/" ? null : <SignOutButton callbackUrl="/" />}
            </div>
          </div>
          <div className="flex flex-col flex-1">{children}</div>
          <div className="flex flex-row gap-8 p-4">
            <Card>
              <div className="flex flex-col space-between h-full">
                <Link
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
                Getting started guide
              </div>
            </Card>
            <Card>
              <div className="flex flex-col justify-between h-full">
                <Link href="https://thenile.dev" target="_blank" rel="noopener">
                  <Image
                    src="/nile_logo.svg"
                    alt="Nile Logo"
                    height={24}
                    width={100}
                  />
                </Link>
                Sign up to Nile
              </div>
            </Card>

            <Card>
              <div className="flex flex-col justify-between h-full">
                <Link
                  href="https://www.thenile.dev/templates"
                  target="_blank"
                  rel="noopener"
                >
                  <Image
                    src="/nile_logo.svg"
                    alt="Nile Logo"
                    height={24}
                    width={100}
                  />
                </Link>
                Try additional templates
              </div>
            </Card>
          </div>
        </main>
      </body>
    </html>
  );
}
