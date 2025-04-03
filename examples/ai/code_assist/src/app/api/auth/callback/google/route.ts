import { NextRequest } from "next/server";
import { nile, handlers } from "../../../[...nile]/nile";
import { registerTenants } from "@/lib/TenantRegistration";

export async function GET(req: NextRequest) {
  const postHandled = await handlers.GET(req);

  if (postHandled) {
    const setCookie = postHandled.headers.getSetCookie();
    const hasSession = setCookie.filter((c) =>
      c.includes("nile.session-token")
    );
    if (hasSession) {
      nile.api.headers = new Headers({ cookie: hasSession.toString() });
      const me = await nile.api.users.me();
      if ("id" in me) {
        await registerTenants(me.id);
      }
    }
  }
  return postHandled;
}
