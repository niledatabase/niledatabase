import { headers as nextHeaders } from "next/headers";
import { nile } from "../api/[...nile]/nile";
import { SignOutButton, UserInfo } from "@niledatabase/react";
import "@niledatabase/react/styles.css";

export default async function Success() {
  const headers = nextHeaders();
  const me = await nile.api.users.me(headers);
  if (me instanceof Response) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-xl">Unauthorized</div>
        <a className="px-y py-2 hover:underline text-primary" href="/">
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
