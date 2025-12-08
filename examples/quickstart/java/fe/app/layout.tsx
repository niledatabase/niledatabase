'use client';

import './globals.css';
import Image from 'next/image';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { usePathname } from 'next/navigation';

import styles from './page.module.css';
import Link from 'next/link';
import { SignOutButton } from '@niledatabase/react';
function Card({ children }: { children: JSX.Element }) {
  return (
    <div className="w-60 rounded-lg border border-gray-600 p-4 transition-all hover:border-gray-700 hover:shadow-lg">
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
        <main className="flex h-screen flex-col items-center">
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <div className="border-b-px flex w-full flex-row items-center justify-between bg-black px-6 py-4 text-white">
              <div className="container mx-auto">
                <div className="space-between flex w-full items-center">
                  <div className="flex items-center text-lg">
                    <Image
                      src="/java.svg"
                      alt="Java Logo"
                      className={styles.logo}
                      width={49.125}
                      height={60}
                    />{' '}
                    Drizzle
                  </div>
                  <div className="flex-1 text-center text-4xl">
                    Yet Another Todo Application
                  </div>
                  <div>
                    <a
                      href="https://thenile.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Created by{'    '}
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
              {pathname === '/' ? null : <SignOutButton callbackUrl="/" />}
            </div>
          </div>
          <div className="flex flex-1 flex-col">{children}</div>
          <div className="flex flex-row gap-8 p-4">
            <Card>
              <div className="space-between flex h-full flex-col">
                <Link
                  href="https://www.thenile.dev/docs/getting-started/languages/java"
                  target="_blank"
                  rel="noopener"
                  style={{
                    fontSize: '18px',
                    alignItems: 'center',
                    display: 'flex',
                    color: 'black',
                  }}
                >
                  <Image
                    src="/java.svg"
                    alt="Java Logo"
                    width={49.125}
                    height={60}
                  />
                </Link>
                Getting started guide
              </div>
            </Card>

            <Card>
              <div className="flex h-full flex-col justify-between">
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
              <div className="flex h-full flex-col justify-between">
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
