import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, client } from './db';
// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: 'src/db/migrations' });
// Don't forget to close the connection, otherwise the script will hang
await client.end();
