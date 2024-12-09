import { drizzle } from 'drizzle-orm/postgres-js';
import dotenv from "dotenv";
import { sql } from "drizzle-orm";
import { PgTransaction } from "drizzle-orm/pg-core";
import { AsyncLocalStorage } from "async_hooks";
import type { Context } from 'hono';

dotenv.config();

export const tenantContext = new AsyncLocalStorage<string | undefined>();

export function tenantDB<T>(
  c: Context, 
  cb: (tx: any) => T | Promise<T>
): Promise<T> {
  const database = drizzle(c.env.DATABASE_URL);
  return database.transaction(async (tx) => {
    const tenantId = tenantContext.getStore();
    console.log("executing query with tenant: " + tenantId);
    if (tenantId) {
      await tx.execute(sql`set nile.tenant_id = '${sql.raw(tenantId)}'`);
    } else {
      await tx.execute(sql`reset nile.tenant_id`);
    }

    return cb(tx);
  }) as Promise<T>;
}
