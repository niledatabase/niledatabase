import { cookies } from "next/headers";
import { configureNile, nile } from "@/lib/NileServer";
import { NextResponse } from "next/server";

export const getAvailableFileCount = async ({
  tenant_id,
}: {
  tenant_id: string;
}) => {
  const tenantNile = await configureNile(tenant_id);
  if (!tenantNile.userId) {
    return new NextResponse("Unauthorized");
  }

  const currentFileCount = await nile.query(
    "SELECT COUNT(*) FROM file WHERE user_id = $1",
    [tenantNile.userId]
  );

  return currentFileCount;
};
