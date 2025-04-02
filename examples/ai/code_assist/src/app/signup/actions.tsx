"use server";
import { registerTenants } from "@/lib/TenantRegistration";
import { nile } from "../api/[...nile]/nile";
import { headers } from "next/headers";

export async function saveUserToTenants() {
  nile.api.headers = await headers();
  console.log(nile.api.headers);
  const me = await nile.api.users.me();
  if ("id" in me) {
    await registerTenants(me.id);
    return { ok: true };
  }
  return { ok: false };
}
