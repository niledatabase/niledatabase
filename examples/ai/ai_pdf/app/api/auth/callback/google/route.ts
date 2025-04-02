import nile from "@/lib/NileServer";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const postHandled = await nile.api.handlers.GET(req);

  if (postHandled) {
    const setCookie = postHandled.headers.getSetCookie();
    const hasSession = setCookie.filter((c) =>
      c.includes("nile.session-token")
    );
    if (hasSession) {
      nile.api.headers = new Headers({ cookie: hasSession.toString() });
      const tenants = await nile.api.tenants.listTenants();
      if (Array.isArray(tenants)) {
        if (!tenants.find((t) => t.name === "workspace")) {
          await nile.api.tenants.createTenant({ name: "workspace" });
        }
      }
    }
  }
  return postHandled;
}
