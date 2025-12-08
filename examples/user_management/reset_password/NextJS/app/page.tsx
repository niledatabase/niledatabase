import { SignInForm } from '@niledatabase/react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center gap-16 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <SignInForm callbackUrl="/reset-password" />
      <span>
        Not a user yet?{' '}
        <Link className="text-primary underline" href="/sign-up">
          Sign up here
        </Link>
      </span>
      <Link className="text-primary underline" href="/forgot-password">
        I forgot my password
      </Link>
    </div>
  );
}
