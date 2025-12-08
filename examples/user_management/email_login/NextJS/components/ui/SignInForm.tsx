'use client';

import { SignInForm } from '@niledatabase/react';
import { Button } from './button';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="mt-24 flex flex-col gap-4">
      <SignInForm callbackUrl="/dashboard" />
      <p>
        Not a user yet?{' '}
        <Button variant="link" className={'pl-0'}>
          <Link href="/sign-up" className="text-primary">
            Sign up here
          </Link>
        </Button>
      </p>
    </div>
  );
}
