import { nile } from '../api/[...nile]/nile';
import { SignOutButton, UserInfo } from '@niledatabase/react';

export default async function Success() {
  const me = await nile.users.getSelf();
  if (me instanceof Response) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-xl">Unauthorized</div>
        <a className="px-y py-2 text-primary hover:underline" href="/">
          Back to home
        </a>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-20">
      <UserInfo />
      <SignOutButton />
    </div>
  );
}
