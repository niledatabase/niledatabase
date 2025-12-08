import { createRequestHandler } from '@react-router/express';
import { drizzle } from 'drizzle-orm/node-postgres';
import express from 'express';
import postgres from 'pg';
import 'react-router';

import { DatabaseContext } from '~/database/context';
import * as schema from '~/database/schema';

declare module 'react-router' {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const app = express();

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');

const client = new postgres.Client(process.env.DATABASE_URL);
await client.connect();
const db = drizzle(client, { schema });
app.use((_, __, next) => DatabaseContext.run(db, next));

app.use(
  createRequestHandler({
    build: () => import('virtual:react-router/server-build'),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: 'Hello from Express',
      };
    },
  }),
);
