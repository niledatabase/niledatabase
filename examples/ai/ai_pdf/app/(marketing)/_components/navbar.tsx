import Link from 'next/link';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { nile } from '@/lib/NileServer';
import UserAccountNav from '@/components/user-account-nav';

export const Navbar = async () => {
  const userInfo = await nile.users.getSelf();

  // Show the public navbar for unauthenticated users or failed responses
  if (!userInfo || userInfo instanceof Response) {
    return (
      <div className="fixed top-0 flex h-14 w-full items-center border-b px-4 shadow-sm">
        <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
          <Logo />
          <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
            <Button size="sm" variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>

            <ModeToggle />

            <Button size="sm" asChild>
              <Link href="/sign-up">Get Taskify for free</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show the authenticated navbar for logged in users
  const email = userInfo.email;
  const picture = userInfo.picture;
  const name = userInfo.name;
  return (
    <div className="fixed top-0 flex h-14 w-full items-center border-b px-4 shadow-sm">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
        <Logo />
        <div className="flex items-center justify-end space-x-4 md:w-full">
          <ModeToggle />
          <Button variant={'ghost'} size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <UserAccountNav email={email} imageUrl={picture} name={name} />
        </div>
      </div>
    </div>
  );
};
