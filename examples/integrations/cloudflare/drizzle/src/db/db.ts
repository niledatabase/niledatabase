import { drizzle } from 'drizzle-orm/postgres-js';
import dotenv from "dotenv";
import { sql } from "drizzle-orm";
import { PgTransaction } from "drizzle-orm/pg-core";
import { AsyncLocalStorage } from "async_hooks";

dotenv.config();

// You can get the connection string with credentials from the Nile console
const db = drizzle("postgres://01939840-ef4a-76d9-b78c-b0489190388f:b63b043d-c81b-45b8-bade-35ea02ebc480@us-west-2.db.dev.thenile.dev/niledb_indigo_house");

// check the connection
// const res = await db.execute("SELECT 'Client connected to Nile' as message");
// console.log(res[0].message);

export const tenantContext = new AsyncLocalStorage<string | undefined>();

export function tenantDB<T>(cb: (tx: any) => T | Promise<T>): Promise<T> {
  return db.transaction(async (tx) => {
    const tenantId = tenantContext.getStore();
    console.log("executing query with tenant: " + tenantId);
    // if there's a tenant ID, set it in the context, otherwise clean old context
    if (tenantId) {
      await tx.execute(sql`set nile.tenant_id = '${sql.raw(tenantId)}'`);
    } else {
      await tx.execute(sql`reset nile.tenant_id`);
    }

    return cb(tx);
  }) as Promise<T>;
}
