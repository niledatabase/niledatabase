import jwtDecode from 'jwt-decode';
import { cookies } from 'next/headers';
import { NileJWTPayload, cookieOptions, toCookieData} from '@/lib/AuthUtils';

// Google SSO redirect posts Nile's response to this route
// This route then redirects the user to the appropriate page
// On failed login, we redirect to the home page with an error message
// On successful login, we set a cookie with access token and other info 
// and redirect to the tenants page
export async function POST(req: Request) {
  const formData = await req.formData();
  const event = formData.get('event');

  let location: string;

  if (event === 'AUTH_ERROR') {
    const message = formData.get('error');
    location = redirectOnError(message ? message.toString() : 'Unknown error');
  } else {
    location = redirectOnSuccess(formData);
  }

  return new Response(null, {
    headers: { 'Location': location },
    status: 302,
  });
}

function redirectOnError(message: string): string {
  cookies().set('errorData', JSON.stringify({
    message: message,
  }), cookieOptions(100));

  return '/';
}

function redirectOnSuccess(formData: FormData): string {
  try {
    const accessToken = String(formData.get('access_token'));
    const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
    const cookieData = toCookieData(formData, decodedJWT);
    cookies().set('authData', JSON.stringify(cookieData), cookieOptions(3600));

    return '/tenants';
  } catch (e) {
    return redirectOnError((e as Error).message);
  }
}