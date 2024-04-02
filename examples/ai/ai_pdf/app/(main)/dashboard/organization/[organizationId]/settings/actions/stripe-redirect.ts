"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { StripeRedirect } from "./schema";
import { InputType, ReturnType } from "./types";

import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import { getUserId } from "@/lib/AuthUtils";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { configureNile } from "@/lib/NileServer";

const handler = async (data: InputType): Promise<ReturnType> => {
  const orgId = data.orgId;
  const user = cookies().get("authData");
  const userId = getUserId(user);
  if (!orgId || !user || !userId) {
    return {
      error: "Unauthorized",
    };
  }

  const tenantNile = configureNile(user, orgId);

  const settingsUrl = absoluteUrl(`/dashboard/organization/${orgId}`);

  let url = "";

  try {
    const orgSubscription = await tenantNile.db.query(
      "select * from user_subscription where user_id = $1",
      [userId]
    );

    console.log(orgSubscription);

    if (orgSubscription.rows[0] && orgSubscription.rows[0].stripe_customer_id) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.rows[0].stripe_customer_id,
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
        // customer_email: user.email, // TBD: Get email from user auth cookie
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
  } catch (err) {
    return {
      error: "Something went wrong! " + err,
    };
  }

  revalidatePath(`/dashboard/organization/${orgId}`);
  console.log("url: ", url);
  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler);
