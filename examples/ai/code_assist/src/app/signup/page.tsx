import { Button } from '@/components/ui/button';
import Form from './Form';
import Link from 'next/link';

// very simple sign up page, it uses a wrapper component around Nile's React components
export default function SignUpPage() {
  return (
    <div className="container mx-auto">
      <div className="mx-auto flex w-2xl flex-col gap-5">
        <Form />
        <div className="mx-auto flex flex-row items-center gap-2 text-sm">
          <div>Already a user?</div>
          <Link href="/">
            <Button variant="link" className="pl-0">
              Sign in here
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
