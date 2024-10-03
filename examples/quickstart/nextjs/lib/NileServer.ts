import { cookies } from "next/headers";
import NileServer from "@niledatabase/server";
// Initialize the Nile server object for reuse in all pages
// Note that the Nile server configuration points to Nile APIs as the base path

// This returns a reference to the Nile Server, configured with the user's auth token and tenantID (if any)
// If Nile already have a connection to the same tenant database for the same user, we'll return an existing connection
export async function configureNile(tenantId: string | void) {
  const cookie = cookies().get("nile.session-token");
  const nile = await NileServer({ debug: true });
  const cooky = cookies();
  const headers = new Headers({ cookie: cooky.toString() });
  const user = await nile.api.users.me(headers);

  if (user instanceof Response) {
    throw Error("user unavailable");
  }

  return nile.getInstance({
    tenantId: String(tenantId),
    userId: user?.id,
    api: {
      token: cooky.get("nile.session-token")?.value,
    },
  });
}
