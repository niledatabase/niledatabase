import Nile from "@niledatabase/server";
import AuthCookieData from "./AuthUtils";

// Initialize the Nile server object for reuse in all pages
// Note that the Nile server configuration points to Nile APIs as the base path

const nile = await Nile({
  debug: true,
});

export default nile;

// This returns a reference to the Nile Server, configured with the user's auth token and tenantID (if any)
// If Nile already have a connection to the same tenant database for the same user, we'll return an existing connection
export function configureNile(
  rawAuthCookie: any,
  tenantId: string | null | undefined
) {
  const authData = JSON.parse(rawAuthCookie.value) as AuthCookieData;
  return nile.getInstance({
    tenantId: tenantId,
    userId: authData.tokenData?.sub,
    api: {
      token: authData.accessToken,
    },
  });
}
