import { SignInForm } from '@niledatabase/react';

export default async function SignIn() {
  return <SignInForm callbackUrl="/dashboard" />;
}
