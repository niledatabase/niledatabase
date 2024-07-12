import Stripe from "stripe";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { configureNile } from "@/lib/NileServer";

export async function POST(req: Request) {
  console.log("Webhook");
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  console.log("stripe session: " + session);
  if (!session?.metadata?.orgId) {
    return new NextResponse("Org ID is required", { status: 400 });
  }
  const nile = await configureNile(cookies().get("authData"), session.metadata.orgId);

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await nile.db.query(
      "INSERT INTO user_subscription (user_id, tenant_id, stripe_subscription_id, stripe_customer_id, stripe_price_id, stripe_current_period_end) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        session.metadata.userId,
        session.metadata.orgId,
        subscription.id,
        subscription.customer,
        subscription.items.data[0].price.id,
        new Date(subscription.current_period_end * 1000),
      ]
    );
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    await nile.db.query(
      "UPDATE user_subscription SET stripe_price_id = $1, stripe_current_period_end = $2 WHERE stripe_subscription_id = $3",
      [
        subscription.items.data[0].price.id,
        new Date(subscription.current_period_end * 1000),
        subscription.id,
      ]
    );
  }

  return new NextResponse(null, { status: 200 });
}
