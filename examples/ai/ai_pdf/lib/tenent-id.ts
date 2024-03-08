import { cookies, headers } from "next/headers";
import { configureNile } from "./AuthUtils";
import nile from "@/lib/NileServer";
import { redirect } from "next/navigation";

export const currentTenantId = async () => {
  const headersList = headers();
  console.log(headersList);
  const referer = headersList.get("referer");
  console.log(referer);
  if (!referer) {
    redirect("/");
  }
  const parts = referer.split("/");
  const number = parts[5];
  return number;
};
