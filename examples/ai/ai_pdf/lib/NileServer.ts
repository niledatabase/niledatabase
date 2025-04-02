import { Nile } from "@niledatabase/server";
import { cookies } from "next/headers";

// Initialize the Nile server object for reuse in all pages
// Note that the Nile server configuration points to Nile APIs as the base path

const nile = await Nile({ debug: true });

export default nile;

export async function getNile() {
  const nextCookies = await cookies();
  nile.api.headers = new Headers({ cookie: nextCookies.toString() });
  return nile;
}

// This returns a reference to the Nile Server, configured with the user's auth token and tenantID (if any)
// If Nile already have a connection to the same tenant database for the same user, we'll return an existing connection
export async function configureNile(tenantId?: string | null | undefined) {
  const nextCookies = await cookies();
  const headers = new Headers({ cookie: nextCookies.toString() });
  const user = await nile.api.users.me(headers);

  if (user instanceof Response) {
    throw Error("user unavailable");
  }

  const config: { tenantId?: string; userId: string } = { userId: user.id };
  if (tenantId) {
    config.tenantId = String(tenantId);
    nile.tenantId = config.tenantId;
  }
  // forward the browser headers on with the request
  nile.api.headers = new Headers({ cookie: nextCookies.toString() });
  console.log(user.id, "wtf is this?", config);
  nile.userId = user.id;
  return nile.getInstance(config);
}
