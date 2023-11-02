import Server from '@niledatabase/server';
import AuthCookieData from '@/lib/AuthUtils';


// Initialize the Nile server object for reuse in all pages
// Note that the Nile server configuration points to Nile APIs as the base path

const nile =  Server({
        workspace: String(process.env.NEXT_PUBLIC_WORKSPACE),
        database: String(process.env.NEXT_PUBLIC_DATABASE),
        api: {
          basePath: String(process.env.NEXT_PUBLIC_NILE_API),
        },
        db: {
          connection: {
            host: process.env.NILE_DB_HOST,
            user: process.env.NILE_USER,
            password: process.env.NILE_PASSWORD,
          },
        },
       });

export default nile;

// This returns a reference to the Nile Server, configured with the user's auth token and tenantID (if any)
// If Nile already have a connection to the same tenant database for the same user, we'll return an existing connection
export function configureNile(rawAuthCookie: any, tenantId: string | null | undefined)  {
    const authData = JSON.parse(rawAuthCookie.value) as AuthCookieData;
    return nile.getInstance({
      tenantId: tenantId,
      userId: authData.tokenData?.sub,
      api: {
        token: authData.accessToken,
      }
    })
}