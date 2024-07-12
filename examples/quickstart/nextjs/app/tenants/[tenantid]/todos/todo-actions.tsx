"use server";
// ^^^ This has to run on the server because it uses database operations and updates the cache

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { configureNile } from "@/lib/NileServer";

export async function addTodo(
  tenantId: string,
  prevState: any,
  formData: FormData
) {
  // Each  a Nile instance is connected to our current tenant DB with the current user permissions
  const tenantNile = await configureNile(cookies().get("authData"), tenantId);
  const title = formData.get("todo");
  console.log(
    "adding Todo " +
      title +
      " for tenant:" +
      tenantNile.tenantId +
      " for user:" +
      tenantNile.userId
  );
  try {
    // need to set tenant ID because it is part of the primary key
    await tenantNile.db.query(
      `INSERT INTO todos (tenant_id, title, complete)
        VALUES ($1, $2, $3)`,
      [tenantNile.tenantId, title, false]
    );
    revalidatePath("/tenants/${tenantID}/todos");
  } catch (e) {
    console.error(e);
    return { message: "Failed to add todo" };
  }
}

export async function completeTodo(
  tenantId: string,
  id: string,
  complete: boolean
) {
  // Each  a Nile instance is connected to our current tenant DB with the current user permissions
  const tenantNile = await configureNile(cookies().get("authData"), tenantId);
  console.log(
    "updating Todo " +
      id +
      " for tenant:" +
      tenantNile.tenantId +
      " for user:" +
      tenantNile.userId
  );
  try {
    // Tenant ID and user ID are in the context, so we don't need to specify them as query filters
    await tenantNile.db.query(
      `UPDATE todos 
      SET complete = $1
      WHERE id = $2`,
      [complete, id]
    );
    revalidatePath("/tenants/${tenantID}/todos");
  } catch (e) {
    console.error(e);
  }
}
