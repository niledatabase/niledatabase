import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: "./src/lib/schema.ts",
  out: "./db/out",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://username:password@db.thenile.dev:5432/db",
  },
});
