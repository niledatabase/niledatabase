import Server from '@theniledev/server';
import { cookies } from 'next/headers';
import jwtDecode from 'jwt-decode';
import { cookieOptions, NileJWTPayload, toCookieData } from '@/utils/AuthUtils';

const nile = Server({
    workspace: String(process.env.NEXT_PUBLIC_WORKSPACE),
    database: String(process.env.NEXT_PUBLIC_DATABASE),
  api: {
    basePath: String(process.env.NEXT_PUBLIC_NILE_API),
  }  
});

// Note that this route must exist in this exact location for user/password signup to work
// Nile's SignUp component posts to this route, we call Nile's signup API via the SDK 
export async function POST(req: Request) {
    console.log("got request");
    const req_json = await req.clone().json();
    console.log(req_json);

    const res = await nile.api.auth.signUp(req);

    // if signup was successful, we want to set the cookies and headers, so it will log the user in too
    // Note that this is optional, check the authentication quickstart for a simpler example of using the Nile SDK for authentication
    if (res && res.status >= 200 && res.status < 300) {
        const body =  await res.json();
        const accessToken = body.token.jwt;
        const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
        const cookieData = {
            accessToken: accessToken,
            tokenData: decodedJWT,
          };
        cookies().set('authData', JSON.stringify(cookieData), cookieOptions(3600));
        return new Response(JSON.stringify(body), { status: 201 });
      } else  {
        // The API sends errors in plain text, so we need to handle them before trying to parse the JSON
        const body = await res.text();
        console.log("got error response: " + body + " " + res.status);
        return new Response(body, { status: res.status });
    }
} 

