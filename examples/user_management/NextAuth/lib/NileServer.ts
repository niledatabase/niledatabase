import Nile from "@niledatabase/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

// Initialize the Nile server object for reuse in all pages
// Note that the Nile server configuration points to Nile APIs as the base path

// Initialize the Nile server object for reuse in all pages
// Note that the Nile server configuration points to Nile APIs as the base path

const nile = Nile();

export default nile;

// This returns a reference to the Nile Server, configured with the user's auth token and tenantID (if any)
// If Nile already have a connection to the same tenant database for the same user, we'll return an existing connection
export async function configureNile(tenantId: string | null | undefined) {
  console.log("configureNile", tenantId);
  const session = await getServerSession(authOptions);
  console.log(session);
  const server = await nile;
  return server.getInstance({
    tenantId: tenantId,
    //@ts-ignore
    userId: session?.user?.id,
    api: {
      token: undefined, // since we authenticated via NextAuth, we don't have a Nile auth token for the user. This means we can't use some of Nile's APIs.
    },
  });
}

export async function getUserName(): Promise<string | null | undefined> {
  try {
    const session = await getServerSession(authOptions);
    const bestName = session?.user?.name || session?.user?.email;
    return bestName;
  } catch (e) {
    return undefined;
  }
}
