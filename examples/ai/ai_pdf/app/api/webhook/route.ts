import Stripe from "stripe";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import nile from "@/lib/NileServer";
import { currentUser } from "@/lib/current-user";
import { configureNile } from "@/lib/AuthUtils";

export async function POST(req: Request) {
  // configureNile(cookies().get("authData"), nile.token);
  console.log("Webhook");
  // const user_identify_number = nile.userId;
  // console.log("user id: ", user_identify_number);
  // if (!user_identify_number) {
  //   console.log("Fail From Webhook");
  //   return new NextResponse(null, { status: 200 });
  // }
  // const user = await currentUser();
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  // console.log(user);
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
  console.log(session);
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.orgId) {
      return new NextResponse("Org ID is required", { status: 400 });
    }
    console.log(session, "session");
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
