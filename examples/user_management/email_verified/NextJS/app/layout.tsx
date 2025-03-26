import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import NextJS from "../public/vercel.svg";
import Link from "next/link";
import Logo from "../components/ui/logo";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Example App with Nile and Next.js",
  description: "Generated by create next app",
};

function Card({ children }: { children: React.JSX.Element }) {
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
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen flex items-center flex-col">
          <div className="bg-black border-b-px flex flex-row justify-between w-full items-center px-6 py-4">
            <div>
              <Image
                src={NextJS}
                alt="Next.js Logo"
                className=""
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
                <div className="text-white flex flex-row gap-3 items-center">
                  Created by <Logo className="h-10" />
                </div>
              </a>
            </div>
          </div>
          <div className="flex flex-col flex-1 max-w-3xl">
            <div className="text-4xl mb-10 mt-20 text-center">
              Email verification example
            </div>
            {children}
          </div>
          <div className="flex flex-row justify-between p-8 gap-8">
            <Card>
              <Link
                href="https://www.thenile.dev/docs/getting-started/languages/nextjs"
                target="_blank"
                rel="noopener"
                className="flex flex-col gap-5 items-start"
              >
                <Logo fill="black" className="h-10" />
                Getting started guide
              </Link>
            </Card>

            <Card>
              <Link
                href="https://thenile.dev"
                target="_blank"
                rel="noopener"
                className="flex flex-col gap-5 items-start"
              >
                <Logo fill="black" className="h-10" />
                Sign up to Nile
              </Link>
            </Card>

            <Card>
              <Link
                href="https://www.thenile.dev/templates"
                target="_blank"
                rel="noopener"
                className="flex flex-col gap-5 items-start"
              >
                <Logo fill="black" className="h-10" />
                Try additional templates
              </Link>
            </Card>
          </div>
        </main>
      </body>
    </html>
  );
}
