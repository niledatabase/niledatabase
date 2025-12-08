import styles from './page.module.css';
import ErrorBox from '../components/ErrorBox';
import { Google } from '@niledatabase/react';
import BasicSignInForm from '@/components/BasicSignInForm';

export default async function Home() {
  // This demo supports both Google and email/password auth.
  // If this is the first time trying Nile, email/password will be simpler.
  // set AUTH_TYPE="google" to use Google auth
  const authType = process.env.AUTH_TYPE;

  return (
    <div>
      <div className={styles.center}>
        <div className="flex w-56 flex-col items-center gap-4">
          <ErrorBox />
          {/* These components are simple wrappers around Nile's React components. 
           It is needed because Nile's React components are client-side only. */}
          {authType === 'google' ? (
            <Google callbackUrl="/tenants" />
          ) : (
            <BasicSignInForm />
          )}
        </div>
      </div>
    </div>
  );
}
