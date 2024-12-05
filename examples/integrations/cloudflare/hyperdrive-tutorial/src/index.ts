/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// Postgres.js 3.4.4 or later is recommended
import postgres from "postgres";

export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "HYPERDRIVE" with the variable name you defined.
  HYPERDRIVE: Hyperdrive;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    console.log(JSON.stringify(env));
    // Create a database client that connects to your database via Hyperdrive.
    //
    // Hyperdrive generates a unique connection string you can pass to
    // supported drivers, including node-postgres, Postgres.js, and the many
    // ORMs and query builders that use these drivers.
    const sql = postgres(env.HYPERDRIVE.connectionString);

    try {
      // Test query
      const results = await sql`SELECT * FROM pg_tables`;

      // Clean up the client, ensuring we don't kill the worker before that is
      // completed.
      ctx.waitUntil(sql.end());

      // Return result rows as JSON
      return Response.json(results);
    } catch (e) {
      console.error(e);
      return Response.json(
        { error: e instanceof Error ? e.message : e },
        { status: 500 },
      );
    }
  },
} satisfies ExportedHandler<Env>;
