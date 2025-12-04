import { cookies } from "next/headers";
import { configureNile, nile } from "@/lib/NileServer";
import { redirect } from "next/navigation";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async (tenant_id: string) => {
  const tenantNile = await configureNile(tenant_id);
  console.log(
    "checking subscription info for: " +
      tenantNile.userId +
      " for tenant " +
      tenantNile.tenantId
  );
  if (!tenantNile.userId) {
    redirect("/login");
  }

  const orgSubscription = await nile.query(
    "SELECT stripe_subscription_id, stripe_current_period_end, stripe_customer_id, stripe_price_id FROM user_subscription WHERE user_id = $1",
    [tenantNile.userId]
  );
  if (!orgSubscription.rows[0]) {
    return false;
  }

  const isValid =
    orgSubscription.rows[0].stripe_price_id &&
    orgSubscription.rows[0].stripe_current_period_end?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
