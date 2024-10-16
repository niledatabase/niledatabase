import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { todos, tenants } from './db/schema';
  
const db = drizzle(process.env.DATABASE_URL!);
async function main() {

  const tenant: typeof tenants.$inferInsert = {
    name: 'My New Tenant',
  };

  const tenantId = await db.insert(tenants).values(tenant).returning({ id: tenants.id });

  console.log('New tenant created!')

  const todo: typeof todos.$inferInsert = {
    title: 'My New Todo',
    tenantId: tenantId[0].id,
  };

  await db.insert(todos).values(todo);

  console.log('New todo created!')

  const rows = await db.select().from(todos);
  console.log('Getting all todos from the database: ', rows)
}

main();