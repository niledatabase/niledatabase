import { pgTable, text, timestamp, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { pgSchema } from "drizzle-orm/pg-core"

export const usersSchema = pgSchema('users');

export const users = usersSchema.table('users', {
  id: uuid('id').default(sql`uuid_generate_v4()`).primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created').defaultNow(),
});

export const tenants = pgTable('tenants', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created').defaultNow(),
});

export const userTenants = usersSchema.table('tenant_users', {
  userId: uuid('user_id').references(() => users.id),
  tenantId: uuid('tenant_id').references(() => tenants.id),
  role: text('roles').array().notNull(),
});

export const teamMembers = pgTable('team_members', {
  id: uuid('id'),
  tenantId: uuid('tenant_id').references(() => tenants.id),
  name: text('name').notNull(),
  email: text('email').notNull(),
  description: text('description'),
  holidayWishes: text('holiday_wishes'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  pk: primaryKey({ columns: [table.id, table.tenantId] })
}));

export const usersRelations = relations(users, ({ many }) => ({
  userTenants: many(userTenants),
}));

export const tenantsRelations = relations(tenants, ({ many }) => ({
  userTenants: many(userTenants),
  teamMembers: many(teamMembers),
}));

export const userTenantsRelations = relations(userTenants, ({ one }) => ({
  user: one(users, {
    fields: [userTenants.userId],
    references: [users.id],
  }),
  tenant: one(tenants, {
    fields: [userTenants.tenantId],
    references: [tenants.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  tenant: one(tenants, {
    fields: [teamMembers.tenantId],
    references: [tenants.id],
  }),
}));

