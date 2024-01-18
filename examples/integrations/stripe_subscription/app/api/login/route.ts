import jwtDecode from 'jwt-decode';
import { NileJWTPayload, cookieOptions } from '@/lib/AuthUtils';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache'
import nile from '@/lib/NileServer';

// Note that this route must exist in this exact location for user/password login to work
// Nile's LoginForm component posts to this route, we call Nile's login API via the SDK 
// Nile SDK sets the right headers and cookies, but in this example, we want to add some custom information to the cookies
// The reason we need this is that this example supports both Google SSO (which has custom information) and user/password login which doesn't
// Check the authentication quickstart for a simpler example of using the Nile SDK without custom cookies
export async function POST(req: Request) {
    const res = await nile.api.auth.login(req);

    // if signup was successful, we want to set the cookies
    if (res && res.status >= 200 && res.status < 300) {
        const body =  await res.json();
        const accessToken = body.token.jwt;
        const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
        const cookieData = {
            accessToken: accessToken,
            tokenData: decodedJWT,
            };
        cookies().set('authData', JSON.stringify(cookieData), cookieOptions(3600));
        revalidatePath('/')
        return new Response(JSON.stringify(body), { status: 200 });
    } else  {
        // The API sends errors in plain text, so we need to handle them before trying to parse the JSON
        const body = await res.text();
        console.log("got error response: " + body + " " + res.status);
        return new Response(body, { status: res.status });
    }
}

