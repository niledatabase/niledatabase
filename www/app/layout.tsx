import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nile Database',
  description: 'Serverless postgres for Modern SaaS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html lang="en">{children}</html>;
}
