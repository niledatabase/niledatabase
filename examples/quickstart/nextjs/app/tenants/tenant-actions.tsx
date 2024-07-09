"use server";
// ^^^ This has to run on the server because it uses database operations and updates the cache

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { configureNile } from "@/lib/NileServer";

export async function createTenant(prevState: any, formData: FormData) {
  const nile = await configureNile(cookies().get("authData"), null);
  const tenantName = formData.get("tenantname")?.toString();
  if (!tenantName) {
    return { message: "No tenant name provided" };
  }

  console.log("creating tenant " + tenantName + " for user:" + nile.userId);

  let success = false; // needed because redirect can't be used in try-catch block
  let tenantID = null;
  try {
    // The token is sent to Nile API and the tenant is created for the specific user
    const createTenantResponse = await nile.api.tenants.createTenant({
      name: tenantName,
    });
    const tenant = await createTenantResponse.json();
    tenantID = tenant.id;
    console.log(
      "created tenant with tenantID: ",
      tenantID,
      " for user: ",
      nile.userId
    );
    revalidatePath("/tenants");
    success = true;
  } catch (e) {
    console.error(e);
    return { message: "Failed to create tenant" };
  }
  if (success && tenantID) {
    redirect(`/tenants/${tenantID}/todos`); // Navigate to new route
  }
}
