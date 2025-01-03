import { headers as nextHeaders } from "next/headers";
import { nile } from "../api/[...nile]/nile";
import { redirect } from "next/navigation";
import VerifyButton from "./VerifyButton";
export default async function Verify() {
  const headers = nextHeaders();
  const me = await nile.api.users.me(headers);
  if (me instanceof Response) {
    return (
      <div className="flex flex-col w-screen h-screen items-center justify-center gap-4">
        <div className="text-xl">Unauthorized</div>
        <a className="px-y py-2 hover:underline text-primary" href="/">
          Back to home
        </a>
      </div>
    );
  }

  if (me.emailVerified) {
    return redirect("/success");
  }
  return (
    <div className="container mx-auto p-12 pt-20 gap-8 flex flex-col items-center">
      <div className="text-2xl">Welcome, {me.email}</div>
      <div>
        Before you can proceed, you are required to verify your email address.
      </div>
      <VerifyButton me={me} />
    </div>
  );
}
