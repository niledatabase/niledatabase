"use server";
// ^^^ This has to run on the server because it uses database operations and updates the cache

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { configureNile } from "@/lib/NileServer";

export async function createTenant(prevState: { message: string | null }, formData: FormData) {
  
  const tenantName = formData.get("tenantname")?.toString();
  if (!tenantName) {
    return { message: "No tenant name provided" };
  }

  let success = false; // needed because redirect can't be used in try-catch block
  let tenantID = null;
  try {
    // The token is sent to Nile API and the tenant is created for the specific user
    // The tenant is created with "free tier" plan by default
    const nile = await configureNile();
    const tenant = await nile.api.tenants.createTenant(tenantName);
    if (tenant instanceof Response) {
      console.log("ERROR creating tenant: ", tenant);
      return { message: "no tenant" };
    }
    tenantID = tenant.id;
    console.log(
      "created tenant with tenantID: ", tenantID
    );

    revalidatePath("/tenants");
    success = true;
  } catch (e) {
    console.error(e);
    return { message: "Failed to create tenant" };
  }
  if (success && tenantID) {
    redirect(`/tenants/${tenantID}/billing`); // Navigate to new route
  }
}
