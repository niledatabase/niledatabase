import { PrismaClient } from '@prisma/client';
import { tenantContext } from './storage';

export const REQUIRE_AUTH = process.env.REQUIRE_AUTH || false;
export async function dbAuthorizer(
  username: string,
  password: string,
  cb: (err: any, result: boolean) => void,
) {
  console.log('authenticating user: ' + username);
  if (!REQUIRE_AUTH) {
    return cb(null, true);
  }
  const tenantDB = tenantContext.getStore();

  const users = await tenantDB?.users.findMany({
    where: {
      id: username, // this looks a bit awkward, but the id is the username and being 128bit, its plenty secure on its own
    },
  });

  // if no users found, return false
  if (!Array.isArray(users) || users.length === 0) {
    return cb(null, false);
  }

  return cb(null, true);
}

export function getUnauthorizedResponse(req: any) {
  return req.auth
    ? 'Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected'
    : 'No credentials provided';
}
