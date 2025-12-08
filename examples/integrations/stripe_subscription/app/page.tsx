import BasicLoginForm from '@/components/BasicSignInForm';
import GoogleAuthPanel from '@/components/GoogleButton';

export default function Home() {
  // This demo supports both Google and email/password auth.
  // If this is the first time trying Nile, email/password will be simpler.
  // set AUTH_TYPE="google" to use Google auth
  const authType = process.env.AUTH_TYPE;
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex w-full flex-col items-center justify-center gap-3">
          {authType === 'google' ? <GoogleAuthPanel /> : <BasicLoginForm />}
        </div>
      </div>
    </div>
  );
}
