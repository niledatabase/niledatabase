"use server";
// ^^^ This has to run on the server because it uses database operations and updates the cache

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { nile } from "@/lib/nile";

export async function addTodo(tId: string, prevState: any, formData: FormData) {
  // Each  a Nile instance is connected to our current tenant DB with the current user permissions

  const session = await getServerSession(authOptions);
  //@ts-expect-error
  nile.setContext({ userId: session?.user?.id, tenantId: tId });

  const title = formData.get("todo");

  const { tenantId, userId } = nile.getContext();
  console.log(
    "adding Todo " + title + " for tenant:" + tenantId + " for user:" + userId
  );
  try {
    // need to set tenant ID because it is part of the primary key
    await nile.db.query(
      `INSERT INTO todos (tenant_id, title, complete) VALUES ($1, $2, $3)`,
      [tenantId, title, false]
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
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const userId = session?.user?.id;
  console.log(
    "updating Todo " +
      id +
      " for tenant:" +
      nile.getContext().tenantId +
      " for user:" +
      userId
  );
  try {
    // Tenant ID and user ID are in the context, so we don't need to specify them as query filters
    await nile.db.query(`UPDATE todos SET complete = $1 WHERE id = $2`, [
      complete,
      id,
    ]);
    revalidatePath("/tenants/${tenantID}/todos");
  } catch (e) {
    console.error(e);
  }
}
