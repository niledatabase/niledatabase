import { cookies } from "next/headers";
import Stripe from "stripe";
import { configureNile } from "@/lib/NileServer";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

function respond(location: string) {
  return new Response(null, {
    headers: { Location: location },
    status: 302,
  });
}

export async function GET(req: NextRequest) {
  console.log("checkout-success called");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
  const searchParams = req.nextUrl.searchParams;
  const tenantId = searchParams.get("tenant_id")?.toString();
  const session_id = searchParams.get("session_id")?.toString();
  let location: string;

  if (!tenantId || !session_id) {
    console.log("missing tenant_id or session_id parameters from request");
    return respond("/"); // TODO: Better error handling
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  const customerId = checkoutSession.customer;

  if (!customerId) {
    console.log(
      "missing customer_id from checkout session " +
        JSON.stringify(checkoutSession, null, 2)
    );
    return respond("/"); // TODO: Better error handling
  }

  const nile = await configureNile();

  // Store the Stripe customer ID  and subscription in the database
  await nile.query(
    `UPDATE tenants 
     SET stripe_customer_id = $1,
         stripe_subscription_id = $2,
         tenant_tier = $3
     WHERE id = $4`,
    [checkoutSession.customer, checkoutSession.subscription, "basic", tenantId]
  );

  revalidatePath("/tenants");
  return respond("/tenants/" + tenantId + "/billing");
}
