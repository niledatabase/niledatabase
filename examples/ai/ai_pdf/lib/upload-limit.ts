import { cookies } from "next/headers";
import { configureNile } from "@/lib/NileServer";
import { NextResponse } from "next/server";

export const getAvailableFileCount = async ({
  tenant_id,
}: {
  tenant_id: string;
}) => {
  const tenantNile = configureNile(cookies().get("authData"), tenant_id);
  if (!tenantNile.userId) {
    return new NextResponse("Unauthorized");
  }

  const currentFileCount = await tenantNile
    .db("file")
    .where({
      user_id: tenantNile.userId,
    })
    .count();

  return currentFileCount;
};
