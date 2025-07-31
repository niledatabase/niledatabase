"use server";
// ^^^ This has to run on the server because it uses database operations and updates the cache

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Nile } from "@niledatabase/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function createTenant(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "Unauthorized" };
  }
  //@ts-ignore
  const userId = session.user?.id;
  const nile = Nile(); // we don't have a tenant yet
  const tenantName = formData.get("tenantname")?.toString();
  if (!tenantName) {
    return { message: "No tenant name provided" };
  }

  console.log("creating tenant " + tenantName + " for user:" + userId);
  let success = false; // needed because redirect can't be used in try-catch block
  let tenantId = "";
  try {
    const tenants = await nile.noContext(({ db }) =>
      db.query(`INSERT INTO tenants (name) VALUES ($1) RETURNING id`, [
        tenantName,
      ])
    );
    tenantId = tenants.rows[0].id;
    await nile.noContext(({ db }) =>
      db.query(
        `INSERT INTO users.tenant_users (user_id, tenant_id) VALUES ($1, $2)`,
        [userId, tenantId]
      )
    );
    console.log(
      "created tenant with tenantID: ",
      tenantId,
      " for user: ",
      userId
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
