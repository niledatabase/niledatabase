import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NileJWTPayload, cookieOptions, toCookieData } from "@/lib/AuthUtils";
import {Nile} from "@niledatabase/server";

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
    const event = formData.get("event");
    console.log("google auth event: " + event);
    const user_id = decodedJWT.sub;
    if (event === "SIGNUP") { // Only add user to all tenants on SIGNUO, not every LOGIN
      const nile = await Nile();
      const tenants = await nile.db.query("select id from tenants");
      for (const tenant of tenants.rows) {
        await nile.db.query(
          "INSERT INTO users.tenant_users(user_id, tenant_id) VALUES($1, $2)",
          [user_id, tenant.id]);
      }
    }
    cookies().set("authData", JSON.stringify(cookieData), cookieOptions(3600));

    return "/tenants";
  } catch (e) {
    return redirectOnError((e as Error).message);
  }
}
