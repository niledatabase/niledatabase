import {sql} from "drizzle-orm"
import { pgTable, primaryKey, uuid, text, timestamp, varchar, boolean} from "drizzle-orm/pg-core";

export const tenants = pgTable("tenants", {
    id: uuid("id").primaryKey(),
    name: text("name"),
    created: timestamp("created"),
    updated: timestamp("updated"),
    deleted: timestamp("deleted"),
});

export const todos = pgTable("todos", {
    id: uuid("id").default(sql`gen_random_uuid()`),
    tenantId: uuid("tenant_id"),
    title: varchar("title", { length: 256 }),
    complete: boolean("complete"),
},(table) => {
    return {
      // we need a composite primary key because Nile's tenant-aware tables require the tenantId as part of the primary key
      pk: primaryKey(table.tenantId, table.id),
    };
  });



