import React from 'react';
import { Link } from 'react-router-dom';
import { SignInForm } from '@niledatabase/react';
import { Button } from './components/ui/button';

export default function Auth() {
  return (
    <div className="mt-30 flex flex-1 flex-col items-center justify-center gap-4">
      <SignInForm callbackUrl="/tenants" />
      <p>
        Not a user yet?{' '}
        <Button variant="link" className={'pl-0'}>
          <Link to="/sign-up">Sign up here</Link>
        </Button>
      </p>
    </div>
  );
}
