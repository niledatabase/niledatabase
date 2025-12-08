import { sql } from 'drizzle-orm';
import { uuid, pgTable, varchar } from 'drizzle-orm/pg-core';

export const guestBook = pgTable('guestBook', {
  id: uuid('id').default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
