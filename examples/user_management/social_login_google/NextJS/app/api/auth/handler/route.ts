import jwtDecode from 'jwt-decode';
import { cookies } from 'next/headers';
import AuthCookieData, { NileJWTPayload } from '@/app/model/AuthCookieData';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

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
  }), buildCookieOptions(100));

  return '/';
}

function buildCookieOptions(maxAge: number): Partial<ResponseCookie> {
  return {
    httpOnly: false,
    secure: process.env.NODE_ENV !== 'development', // Use HTTPS in production
    maxAge: maxAge,
    path: '/',
  };
}

function redirectOnSuccess(formData: FormData): string {
  try {
    const cookieData = toCookieData(formData);
    cookies().set('authData', JSON.stringify(cookieData), buildCookieOptions(3600));

    return '/dashboard';
  } catch (e) {
    return redirectOnError((e as Error).message);
  }
}

function toCookieData(formData: FormData): AuthCookieData {
  const accessToken = formData.get('access_token') as string;
  const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
  return {
    accessToken: formData.get('access_token') as string,
    state: formData.get('state') as string,
    event: formData.get('event') as string,
    error: formData.get('error') as string,
    tenantId: formData.get('tenantId') as string,
    tokenData: decodedJWT,
  };
}
