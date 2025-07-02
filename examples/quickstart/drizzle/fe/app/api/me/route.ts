import { cookies } from "next/headers";
import { nile } from "../[...nile]/nile";

export async function GET() {
  const currentUser = await nile.users.getSelf();
  console.log("currentUser", currentUser);
  if (currentUser instanceof Response) {
    return Response.json({ userID: null, error: currentUser.text() });
  }
  return Response.json({ userID: currentUser.id, ...currentUser });
}
