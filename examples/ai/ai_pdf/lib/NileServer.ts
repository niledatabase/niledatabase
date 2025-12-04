import { Nile } from "@niledatabase/server";
import { nextJs } from "@niledatabase/nextjs";

export const nile = Nile({
  extensions: [nextJs],
});

export async function configureNile(tenantId?: string | null | undefined) {
  const user = await nile.users.getSelf();

  if (user instanceof Response) {
    throw Error("user unavailable");
  }

  const config: { tenantId?: string; userId: string } = { userId: user.id };
  if (tenantId) {
    config.tenantId = String(tenantId);
  }

  const nileWithContext = await nile.withContext(config);

  return { nile: nileWithContext, userId: user.id, tenantId: config.tenantId };
}
