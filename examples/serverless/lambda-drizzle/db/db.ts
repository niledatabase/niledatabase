import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
// using the standard node-postgres library. You can use it with "Pool" too
import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";
import { sql } from "drizzle-orm";
import { PgTransaction } from "drizzle-orm/pg-core";
import { AsyncLocalStorage } from 'async_hooks'

dotenv.config();

// You can get the connection string with credentials from the Nile console
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

// Drizzle expects the connection to be open when using a client. Alternatively, you can use a pool
client.connect()
console.log("connected to db");


export const db = drizzle(client,{ logger: true });
export const tenantContext = new AsyncLocalStorage<string | undefined>()

export function tenantDB<T>(
        cb: (tx:any) => T | Promise<T>
      ): Promise<T> {
        return db.transaction(async (tx) => {
            const tenantId = tenantContext.getStore();
            console.log("executing query with tenant: " + tenantId)
            // clean old context
            await tx.execute(
                sql`reset nile.tenant_id`
            );
            // if there's a tenant ID, set it in the context
            if (tenantId) {
                await tx.execute(
                sql`set nile.tenant_id = '${sql.raw(tenantId)}'`
                );
            }
      
            return cb(tx)
        }) as Promise<T>
}