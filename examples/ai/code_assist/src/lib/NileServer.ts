import { nile } from '../app/api/[...nile]/nile';

// This returns a reference to the Nile Server, configured with the user's auth token and tenantID (if any)
// If Nile already have a connection to the same tenant database for the same user, we'll return an existing connection
export async function configureNile(tenantId: string | void) {
  const user = await nile.users.getSelf();

  if (user instanceof Response) {
    throw Error('user unavailable');
  }

  return nile.withContext({
    tenantId: String(tenantId),
    userId: user?.id,
  });
}
