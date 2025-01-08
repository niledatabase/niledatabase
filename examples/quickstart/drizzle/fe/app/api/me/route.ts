import { cookies } from "next/headers";
import { nile } from "../[...nile]/nile";

export async function GET() {
  const nextCookies = cookies();
  nile.api.headers = new Headers({ cookie: nextCookies.toString() });

  const currentUser = await nile.api.users.me();
  console.log("currentUser", currentUser);
  if (currentUser instanceof Response) {
    return Response.json({ userID: null, error: currentUser.text() });
  }
  return Response.json({ userID: currentUser.id });
}
