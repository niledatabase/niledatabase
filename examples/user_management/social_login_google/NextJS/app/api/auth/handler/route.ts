import jwtDecode from "jwt-decode";
import { cookies } from 'next/headers';
import AuthCookieData, { NileJWTPayload } from "@/app/model/AuthCookieData";

export async function POST(req: Request) {
  const formData = await req.formData();
  const event = formData.get("event");

  if (event === "AUTH_ERROR") {
    return new Response(JSON.stringify({ error: formData.get("error") }), { status: 500 });
  }

  try {
    const cookieData = toCookieData(formData);

    cookies().set('authData', JSON.stringify(cookieData), {
      httpOnly: false,
      secure: process.env.NODE_ENV !== 'development', // Use HTTPS in production
      maxAge: 3600, // 1 hour
      path: '/',
    });

    return new Response(JSON.stringify(cookieData), {
      headers: {
        'Location': '/dashboard',
      },
      status: 302,
    });
  } catch (e) {
    return new Response(JSON.stringify(e as Error), {status: 500});
  }
}

function toCookieData(formData: FormData): AuthCookieData {
  const accessToken = formData.get("access_token") as string;
  const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
  return {
    accessToken: formData.get("access_token") as string,
    state: formData.get("state") as string,
    event: formData.get("event") as string,
    error: formData.get("error") as string,
    tenantId: formData.get("tenantId") as string,
    tokenData: decodedJWT,
  };
}
