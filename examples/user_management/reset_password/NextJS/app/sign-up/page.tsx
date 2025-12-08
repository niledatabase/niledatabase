import { SignUpForm } from '@niledatabase/react';
import Link from 'next/link';

export default async function Signup() {
  return (
    <div className="flex flex-col items-center gap-4">
      <SignUpForm />
      <div>
        <span>
          Have an email already?{' '}
          <Link className="text-primary underline" href="/">
            Reset your password
          </Link>
        </span>
      </div>
    </div>
  );
}
