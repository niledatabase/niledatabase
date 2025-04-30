import { NextRequest } from "next/server";
import { handlersWithContext } from "../../../[...nile]/nile";
import { registerTenants } from "@/lib/TenantRegistration";

export async function GET(req: NextRequest) {
  const { nile, response } = await handlersWithContext.GET(req);

  if (nile) {
    const me = await nile.api.users.me();
    if ("id" in me) {
      await registerTenants(me.id);
    }
  }
  return response;
}
