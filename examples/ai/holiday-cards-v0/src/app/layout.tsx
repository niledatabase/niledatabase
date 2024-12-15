import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Providers from '@/components/providers'
import Image from 'next/image'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Holiday Wishes App',
  description: 'A multi-tenant app for generating holiday wishes',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-r from-red-100 to-green-100 min-h-screen`}>
        <Providers session={session}>
          <nav className="bg-white/80 backdrop-blur-sm p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-red-600">Holiday Wishes</Link>
              <div className="space-x-4">
                {session ? (
                  <>
                    <Button asChild variant="ghost">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/api/auth/signout">Logout</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </nav>
          <main className="container mx-auto py-8">
            {children}
          </main>
          <footer className="fixed bottom-0 w-full bg-white/80 backdrop-blur-sm p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <span>Built with</span>
                <Link href="https://www.thenile.dev" target="_blank" className="flex items-center">
                  <Image
                    src="/nile_logo.svg"
                    alt="Nile"
                    width={50}
                    height={50}
                    className="inline-block"
                  />
                </Link>
                <span>+</span>
                <Link href="https://openai.com" target="_blank" className="text-green-600 hover:text-green-700">
                  OpenAI
                </Link>
                <span>+</span>
                <Link href="https://v0.dev" target="_blank" className="text-black-600 hover:text-purple-700">
                  v0
                </Link>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}

