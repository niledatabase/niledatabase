import { headers as nextHeaders } from "next/headers";
import { nile } from "../api/[...nile]/nile";
import SignOut from "./signout";

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
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col rounded-lg border border-slate-500 p-10 gap-2">
        <div className="flex flex-row">
          <div className="w-44 pr-3">email:</div>
          {me.email}
        </div>
        <div className="flex flex-row">
          <div className="w-44 pr-3">id:</div>
          {me.id}
        </div>
        <div className="flex flex-row">
          <div className="w-44 pr-3">created:</div>
          {me.created}
        </div>
        <div className="flex flex-row">
          <div className="w-44 pr-3">updated:</div>
          {me.updated}
        </div>
        <div className="flex flex-row">
          <div className="w-44 pr-3">verified:</div>
          {me.emailVerified}
        </div>
      </div>
      <SignOut />
    </div>
  );
}
