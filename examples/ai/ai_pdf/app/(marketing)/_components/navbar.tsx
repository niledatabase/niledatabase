import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cookies } from "next/headers";
import nile from "@/lib/NileServer";
import UserAccountNav from "@/components/user-account-nav";

export const Navbar = async () => {
  const nextCookies = await cookies();
  const headers = new Headers({ cookie: nextCookies.toString() });
  const userInfo = await nile.api.users.me(headers);

  // Show the public navbar for unauthenticated users or failed responses
  if (!userInfo || userInfo instanceof Response) {
    return (
      <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm flex items-center">
        <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
          <Logo />
          <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
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
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 flex items-center justify-end md:w-full">
          <ModeToggle />
          <Button variant={"ghost"} size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <UserAccountNav email={email} imageUrl={picture} name={name} />
        </div>
      </div>
    </div>
  );
};
