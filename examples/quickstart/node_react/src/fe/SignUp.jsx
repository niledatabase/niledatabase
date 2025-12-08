import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpForm } from '@niledatabase/react';
import { Button } from './components/ui/button';

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <SignUpForm
        redirect={false}
        onSuccess={(response) => {
          console.log('success response from signup:', response);
          // Work around for now, we need to redirect to the tenants page after signup
          // assuming signup actually authenticates the user
          navigate('/');
        }}
        onError={(error) => setError(error)}
      />
      {error && <div className="text-destructive mt-2">⚠️ {error}</div>}
      <p>
        Not a user yet?{' '}
        <Button variant="link" className={'pl-0'}>
          <Link to="/">Sign in here</Link>
        </Button>
      </p>
    </div>
  );
}
