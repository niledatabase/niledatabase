import { Button } from '@/components/ui/button';
import SignUp from '@/components/ui/SignUpForm';
import { Toaster } from '@/components/ui/toast';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mt-24 text-3xl">Sign up</h2>
      <SignUp />
      <p>
        Already a user?{' '}
        <Button variant="link" className="pl-0">
          <Link href="/" className="text-primary">
            Sign in here
          </Link>
        </Button>
      </p>
      <Toaster />
    </div>
  );
}
