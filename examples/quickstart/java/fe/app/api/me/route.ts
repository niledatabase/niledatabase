import { nile } from '../[...nile]/nile';

export async function GET() {
  const currentUser = await nile.users.getSelf();
  if (currentUser instanceof Response) {
    return Response.json({ userID: null, error: currentUser.text() });
  }
  return Response.json({ userID: currentUser.id, ...currentUser });
}
