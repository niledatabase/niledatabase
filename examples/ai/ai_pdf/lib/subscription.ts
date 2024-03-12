import { cookies } from "next/headers";
import { configureNile } from '@/lib/NileServer';
import { redirect } from "next/navigation";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async (tenant_id: string) => {
  const tenantNile = configureNile(cookies().get("authData"), tenant_id);
  console.log("checking subscription info for: " + tenantNile.userId + " for tenant " + tenantNile.tenantId);
  if (!tenantNile.userId) {
    redirect("/login");
  }
  
  const orgSubscription = await tenantNile
    .db("user_subscription")
    .where({
      user_id: tenantNile.userId,
    })
    .select(
      "stripe_subscription_id",
      "stripe_current_period_end",
      "stripe_customer_id",
      "stripe_price_id"
    );

  if (!orgSubscription[0]) {
    return false;
  }

  const isValid =
    orgSubscription[0].stripe_price_id &&
    orgSubscription[0].stripe_current_period_end?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
