import { cookies } from "next/headers";
import { configureNile } from "./AuthUtils";
import nile from "./NileServer";
import { NextResponse } from "next/server";

export const getAvailableTenantCount = async () => {
  configureNile(cookies().get("authData"), null);
  if (!nile.userId) {
    return new NextResponse("Unauthorized");
  }

  const currentCount = await nile
    .db("users.tenant_users")
    .where({
      user_id: nile.userId,
      roles: ["owner"],
    })
    .count();

  return currentCount;
};
