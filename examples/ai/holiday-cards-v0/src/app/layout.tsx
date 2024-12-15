import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Providers from '@/components/providers'
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
        </Providers>
      </body>
    </html>
  )
}

