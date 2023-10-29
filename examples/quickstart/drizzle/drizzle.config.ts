import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./src/db/schema.ts",
  out: "./db/out",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "postgresql://username:password@db.thenile.dev:5432/db",
  }
} satisfies Config;