import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NileJWTPayload, cookieOptions, toCookieData } from "@/lib/AuthUtils";
import { registerTenants } from "@/lib/TenantRegistration";

// Google SSO redirect posts Nile's response to this route
// This route then redirects the user to the appropriate page
// On failed login, we redirect to the home page with an error message
// On successful login, we set a cookie with access token and other info
// and redirect to the tenants page
export async function POST(req: Request) {
  const formData = await req.formData();
  const event = formData.get("event");

  let location: string;

  if (event === "AUTH_ERROR") {
    const message = formData.get("error");
    location = redirectOnError(message ? message.toString() : "Unknown error");
  } else {
    location = await redirectOnSuccess(formData);
  }

  return new Response(null, {
    headers: { Location: location },
    status: 302,
  });
}

function redirectOnError(message: string): string {
  cookies().set(
    "errorData",
    JSON.stringify({
      message: message,
    }),
    cookieOptions(100)
  );

  return "/";
}

// Because this examples lets users browser existing tenants, we need to give each new user permission to access all tenants
async function redirectOnSuccess(formData: FormData): Promise<string> {
  try {
    const accessToken = String(formData.get("access_token"));
    const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
    const cookieData = toCookieData(formData, decodedJWT);

    const user_id = decodedJWT.sub;
    if (!user_id) {
      console.log("No user ID in JWT");
      return redirectOnError("No user ID in JWT");
    }
    await registerTenants(user_id);

    cookies().set("authData", JSON.stringify(cookieData), cookieOptions(3600));

    return "/tenants";
  } catch (e) {
    return redirectOnError((e as Error).message);
  }
}
