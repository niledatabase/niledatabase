import { nile } from '../app/api/[...nile]/nile';
import { cookies } from 'next/headers';

// This returns a reference to the Nile Server, configured with the user's auth token and tenantID (if any)
// If Nile already have a connection to the same tenant database for the same user, we'll return an existing connection
export async function configureNile(tenantId: string | void) {
  const nextCookies = await cookies();
  const headers = new Headers({ cookie: nextCookies.toString() });
  const user = await nile.api.users.me(headers);

  if (user instanceof Response) {
    throw Error('user unavailable');
  }

  return nile.getInstance({
    tenantId: String(tenantId),
    userId: user?.id,
    api: {
      token: nextCookies.get(
        `${process.env.VERCEL === '1' ? '__Secure-' : ''}nile.session-token`,
      )?.value,
    },
  });
}
