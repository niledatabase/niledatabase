"use server";
// ^^^ This has to run on the server because it uses database operations and updates the cache

import { revalidatePath } from "next/cache";
import { configureNile } from "@/lib/NileServer";
import { aiEstimate, embedTask, embeddingToSQL } from "@/lib/AiUtils";

export async function addTodo(
  tenantId: string,
  prevState: any,
  formData: FormData
) {
  // Each  a Nile instance is connected to our current tenant DB with the current user permissions
  const tenantNile = await configureNile(tenantId);
  const title = formData.get("todo");
  console.log(
    "adding Todo " +
      title +
      " for tenant:" +
      tenantNile.tenantId +
      " for user:" +
      tenantNile.userId
  );
  if (!title) {
    return { message: "Please enter a title" };
  }
  // for each todo, we want to try and generate an AI estimate.
  const estimate = await aiEstimate(tenantNile, title.toString());
  // We also want to try and embed the task for future AI processing
  const embedding = await embedTask(title.toString());
  try {
    // need to set tenant ID because it is part of the primary key
    await tenantNile.db.query(
      `INSERT INTO todos (tenant_id, title, estimate, embedding, complete)
        VALUES ($1, $2, $3, $4, $5)`,
      [tenantNile.tenantId, title, estimate, embeddingToSQL(embedding), false]
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
  const tenantNile = await configureNile(tenantId);
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
