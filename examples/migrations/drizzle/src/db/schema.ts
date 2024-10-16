import { sql } from "drizzle-orm";
import {
  pgTable,
  primaryKey,
  uuid,
  text,
  timestamp,
  varchar,
  boolean,
  vector,
} from "drizzle-orm/pg-core";

export const tenants = pgTable("tenants", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text("name"),
  created: timestamp("created"),
  updated: timestamp("updated"),
  deleted: timestamp("deleted"),
});

export const todos = pgTable(
  "todos",
  {
    id: uuid("id").default(sql`gen_random_uuid()`),
    tenantId: uuid("tenant_id"),
    title: varchar("title", { length: 256 }),
    estimate: varchar("estimate", { length: 256 }),
    embedding: vector("embedding", { dimensions: 768 }),
    complete: boolean("complete"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.tenantId, table.id] }),
    };
  }
);
