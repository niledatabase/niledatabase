import { SignUpForm } from '@niledatabase/react';
import { Link, redirect } from 'react-router';
import logoDark from '../welcome/logo-dark.svg';
import logoLight from '../welcome/logo-light.svg';

export default function SignIn() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <SignUpForm
          onSuccess={() => {
            redirect('/dashboard');
          }}
        />
        <div>
          Already a user? <Link to="/">Sign in</Link>
        </div>
      </div>
    </main>
  );
}
