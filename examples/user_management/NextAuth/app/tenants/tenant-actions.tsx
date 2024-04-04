"use server";
// ^^^ This has to run on the server because it uses database operations and updates the cache

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { configureNile } from "@/lib/NileServer";

export async function createTenant(prevState: any, formData: FormData) {
  const nile = await configureNile(null); // we don't have a tenant yet
  const tenantName = formData.get("tenantname")?.toString();
  if (!tenantName) {
    return { message: "No tenant name provided" };
  }

  console.log("creating tenant " + tenantName + " for user:" + nile.userId);

  let success = false; // needed because redirect can't be used in try-catch block
  let tenantId = null;
  try {
    const tenants = await nile
      .db("tenants")
      .insert({ name: tenantName })
      .returning("id");
    tenantId = tenants[0].id;
    await nile
      .db("users.tenant_users")
      .insert({ user_id: nile.userId, tenant_id: tenantId });

    console.log(
      "created tenant with tenantID: ",
      tenantId,
      " for user: ",
      nile.userId
    );
    revalidatePath("/tenants");
    success = true;
  } catch (e) {
    console.error(e);
    return { message: "Failed to create tenant" };
  }
  if (success && tenantId) {
    console.log(tenantId);
    redirect(`/tenants/${tenantId}/todos`); // Navigate to new route
  } else {
    console.log(
      "something went wrong when creating tenant, this should not have happened"
    );
  }
}
