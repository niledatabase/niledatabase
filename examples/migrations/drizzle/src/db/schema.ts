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
  timestamp
} from "drizzle-orm/pg-core";

export const tenants = pgTable("tenants", {
	id: uuid().default(sql`public.uuid_generate_v7()`).primaryKey().notNull(),
	name: text(),
	created: timestamp({ mode: 'string' }).default(sql`LOCALTIMESTAMP`).notNull(),
	updated: timestamp({ mode: 'string' }).default(sql`LOCALTIMESTAMP`).notNull(),
	deleted: timestamp({ mode: 'string' }),
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
