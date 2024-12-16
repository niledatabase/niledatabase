'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AuthButtons() {
  const { data: session, status } = useSession()

  return (
    <div className="space-x-4">
      {status === 'authenticated' ? (
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
  )
}