import { Nile } from "@niledatabase/server";

export async function registerTenants(user_id: string) {
  const nile = await Nile();
  const tenants = await nile.db.query(
    "select id from tenants where id not in (select tenant_id from users.tenant_users where user_id = $1)",
    [user_id]
  );
  for (const tenant of tenants.rows) {
    await nile.db.query(
      "INSERT INTO users.tenant_users(user_id, tenant_id) VALUES($1, $2)",
      [user_id, tenant.id]
    );
  }
}
