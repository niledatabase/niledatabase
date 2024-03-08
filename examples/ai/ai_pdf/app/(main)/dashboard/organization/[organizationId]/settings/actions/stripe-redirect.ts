"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { StripeRedirect } from "./schema";
import { InputType, ReturnType } from "./types";

import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@/lib/current-user";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import nile from "@/lib/NileServer";
import { currentTenantId } from "@/lib/tenent-id";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  console.log("user: ", user);
  const userId = user.id;
  console.log(userId);

  const number = await currentTenantId();
  console.log(number);
  const orgId = number;
  //   const { orgId } = user;
  if (!userId || !orgId || !user) {
    return {
      error: "Unauthorized",
    };
  }

  const settingsUrl = absoluteUrl(`/dashboard/organization/${orgId}`);

  let url = "";

  try {
    const orgSubscription = await nile.db("user_subscription").where({
      tenant_id: orgId,
      user_id: userId,
    });

    console.log(orgSubscription);

    if (orgSubscription[0] && orgSubscription[0].stripe_customer_id) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription[0].stripe_customer_id,
        return_url: settingsUrl,
      });
      console.log("Exist:", stripeSession);
      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.email,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Chatty Pro",
                description: "Unlimited boards for your organization",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
          userId,
        },
      });
      console.log("New:", stripeSession);
      url = stripeSession.url || "";
    }
  } catch {
    return {
      error: "Something went wrong!",
    };
  }

  revalidatePath(`/dashboard/organization/${orgId}`);
  console.log("url: ", url);
  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler);
