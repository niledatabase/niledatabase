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
  const nile = configureNile(cookies().get("authData"), session.metadata.orgId);

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await nile.db("user_subscription").insert({
      user_id: session.metadata.userId,
      tenant_id: session.metadata.orgId,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer as string,
      stripe_price_id: subscription.items.data[0].price.id,
      stripe_current_period_end: new Date(
        subscription.current_period_end * 1000
      ),
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    await nile
      .db("user_subscription")
      .where({
        stripe_subscription_id: subscription.id,
      })
      .update({
        stripe_price_id: subscription.items.data[0].price.id,
        stripe_current_period_end: new Date(
          subscription.current_period_end * 1000
        ),
      });
  }

  return new NextResponse(null, { status: 200 });
}
