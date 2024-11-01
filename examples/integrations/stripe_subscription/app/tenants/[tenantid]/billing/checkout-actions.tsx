"use server";
import { redirect } from "next/navigation";
import { configureNile } from "@/lib/NileServer";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// You will need your own API key from Stripe
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function createCheckoutSession(formData: FormData) {
  console.log("createCheckoutSession called");

  const tenantid = formData.get("tenantid")?.toString();

  const prices = await stripe.prices.list();

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id, // we are cheating a bit because we only have one SKU, but you should filter this by price ID
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url:
      process.env.NEXT_PUBLIC_BASE_PATH +
      `/api/checkout-success?session_id={CHECKOUT_SESSION_ID}&tenant_id=${tenantid}`,
    cancel_url:
      process.env.NEXT_PUBLIC_BASE_PATH + `/tenants/${tenantid}/billing`,
  });
  const url: string = session.url || "/";
  redirect(url);
}

export async function cancelSubscription(formData: FormData) {
  console.log("cancelSubscription called");

  const tenantid = formData.get("tenantid")?.toString();
  const tenantNile = await configureNile(tenantid);

  // We are looking up the subscription ID from the tenant database
  const resp = await tenantNile.db.query(
    `SELECT stripe_subscription_id FROM tenants`
  );

  const subscriptionId = resp.rows[0].stripe_subscription_id;
  console.log(
    "cancelling subscription " + subscriptionId + " for tenant " + tenantid
  );

  // and we ask Stripe to cancel the subscription immediately
  try {
    await stripe.subscriptions.cancel(subscriptionId);
    // if we got here, subscription was cancelled successfully, lets downgrade the tenant tier too
    // we need to reset the tenantID before we update the tenant
    tenantNile.tenantId = null;
    await tenantNile.db.query(
      `UPDATE tenants 
       SET tenant_tier = $1,
           stripe_subscription_id = NULL
       WHERE id = $2`,
      ["free", tenantid]
    );
  } catch (e) {
    console.log("error cancelling subscription", e);
    console.error(e);
  }

  revalidatePath("/tenants/" + tenantid + "/billing");
  redirect("/tenants/" + tenantid + "/billing");
}

export async function redirectToStripePortal(formData: FormData) {
  console.log("stripe-portal-redirect called");
  const tenantId = formData.get("tenantid")?.toString();

  if (!tenantId) {
    console.log("missing tenant_id from request");
  }

  // Here we are getting a connection to a specific tenant database
  const tenantNile = await configureNile(tenantId);

  // Get the Stripe customer ID from the database
  const resp = await tenantNile.db.query(
    `SELECT stripe_customer_id FROM tenants`
  );

  const customerId = resp.rows[0].stripe_customer_id;

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl =
    process.env.NEXT_PUBLIC_BASE_PATH + `/tenants/${tenantId}/billing`;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  redirect(portalSession.url);
}
