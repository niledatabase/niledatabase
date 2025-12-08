import { nile } from '../api/[...nile]/nile';
import { redirect } from 'next/navigation';
import VerifyButton from './VerifyButton';
export default async function Verify() {
  const me = await nile.users.getSelf();
  if (me instanceof Response) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="text-xl">Unauthorized</div>
        <a className="px-y py-2 text-primary hover:underline" href="/">
          Back to home
        </a>
      </div>
    );
  }

  if (me.emailVerified) {
    return redirect('/success');
  }
  return (
    <div className="container mx-auto flex flex-col items-center gap-8 p-12 pt-20">
      <div className="text-2xl">Welcome, {me.email}</div>
      <div>
        Before you can proceed, you are required to verify your email address.
      </div>
      <VerifyButton me={me} />
    </div>
  );
}
