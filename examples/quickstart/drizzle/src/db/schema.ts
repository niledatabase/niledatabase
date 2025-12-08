import { sql } from 'drizzle-orm';
import {
  pgTable,
  pgSchema,
  primaryKey,
  uuid,
  text,
  timestamp,
  varchar,
  boolean,
  vector,
} from 'drizzle-orm/pg-core';

export const usersSchema = pgSchema('users');

export const tenants = pgTable('tenants', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text('name'),
  created: timestamp('created'),
  updated: timestamp('updated'),
  deleted: timestamp('deleted'),
});

export const todos = pgTable(
  'todos',
  {
    id: uuid('id').default(sql`gen_random_uuid()`),
    tenantId: uuid('tenant_id'),
    title: varchar('title', { length: 256 }),
    estimate: varchar('estimate', { length: 256 }),
    embedding: vector('embedding', { dimensions: 768 }),
    complete: boolean('complete'),
  },
  (table) => {
    return {
      // we need a composite primary key because Nile's tenant-aware tables require the tenantId as part of the primary key
      pk: primaryKey({ columns: [table.tenantId, table.id] }),
    };
  },
);

// we need this for the deployed demo, where we authenticate users
// this is minimal modeling of the tables in the DB without relations and without all the fields.
export const users = usersSchema.table('users', {
  id: uuid('id').primaryKey(),
  name: text('name'),
  email: text('email'),
});

export const tenant_users = usersSchema.table('tenant_users', {
  tenant_id: uuid('tenant_id'),
  user_id: uuid('user_id'),
});
