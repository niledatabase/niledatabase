import { cookies } from "next/headers";
import { configureNile } from "./AuthUtils";
import nile from "@/lib/NileServer";
import { redirect } from "next/navigation";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async (tenant_id: string) => {
  configureNile(cookies().get("authData"), null);
  console.log("checking subscription info for: " + nile.userId);
  if (!nile.userId) {
    redirect("/login");
  }
  
  const orgSubscription = await nile
    .db("user_subscription")
    .where({
      tenant_id: tenant_id,
      user_id: nile.userId,
    })
    .select(
      "stripe_subscription_id",
      "stripe_current_period_end",
      "stripe_customer_id",
      "stripe_price_id"
    );
  console.log(orgSubscription);

  if (!orgSubscription[0]) {
    return false;
  }

  const isValid =
    orgSubscription[0].stripe_price_id &&
    orgSubscription[0].stripe_current_period_end?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
