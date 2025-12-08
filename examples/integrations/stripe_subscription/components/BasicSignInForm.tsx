'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SignInForm } from '@niledatabase/react';
import { Button } from './button';

export default function BasicLoginForm() {
  const { push } = useRouter();
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex w-full flex-col gap-5 space-y-8">
      {/* Nile's Login component calls the auth API route, which will set the right cookies. So we just need to redirect to the right page. */}
      {error && (
        <div className="rounded-md bg-destructive p-2 text-white">{error}</div>
      )}
      <SignInForm
        callbackUrl="/tenants"
        onError={(resp) => {
          setError('An error has occurred. ' + resp.message);
        }}
      />
      <div className="text-sm">
        Not a user yet?{' '}
        <Link href="/signup">
          <Button variant="link" className="pl-0">
            Sign up here
          </Button>
        </Link>
      </div>
    </div>
  );
}
