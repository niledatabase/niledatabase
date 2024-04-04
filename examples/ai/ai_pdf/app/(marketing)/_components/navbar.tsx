import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { configureNile } from "@/lib/NileServer";
import { cookies } from "next/headers";
import nile from "@/lib/NileServer";
import UserAccountNav from "@/components/user-account-nav";
import { redirect } from "next/navigation";

export const Navbar = async () => {
  const userData = cookies().get("authData");
  if (userData) {
    const nile = configureNile(userData, null);
    console.log("showing navbar for user: " + nile.userId);
  }
  if (!userData || !nile.userId) {
    return (
      <>
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
      </>
    );
  } else {
    const userInfo = await nile.db("users.users").where("id", "=", nile.userId);
    console.log(userInfo);
    const email = userInfo[0].email;
    const picture = userInfo[0].picture;
    const name = userInfo[0].name;
    return (
      <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm flex items-center">
        <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
          <Logo />
          <div className="space-x-4 w-[200px] max-w-[210px] flex items-center justify-between md:w-full">
            <ModeToggle />
            {/* {nile.userId ? ( */}
            {/* <Button variant={"ghost"} size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button> */}
            {/* ) : (
              <Button size="sm" variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )} */}

            {/* {nile.userId ? ( */}
            <Button size="sm" variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            {/* <UserAccountNav email={email} imageUrl={picture} name={name} /> */}
            {/* ) : (
              ""
            )} */}
          </div>
        </div>
      </div>
    );
  }
};
