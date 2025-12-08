'use client';
import { PasswordResetForm, SignOutButton } from '@niledatabase/react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordForm() {
  const { push } = useRouter();
  return (
    <div className="flex flex-col items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="flex flex-row gap-4">
        <PasswordResetForm
          onSuccess={() => {
            push('/dashboard');
          }}
        />
      </div>

      <SignOutButton callbackUrl="/" />
    </div>
  );
}
