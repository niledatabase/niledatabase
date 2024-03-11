import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FC } from "react";
import { SubscriptionButton } from "./_components/subscription_button";
import { checkSubscription } from "@/lib/subscription";

interface pageProps {}

const page = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const isPro = await checkSubscription(params.organizationId);
  return (
    <>
      <div className="mt-10">
        <SubscriptionButton isPro={isPro} />
      </div>
    </>
  );
};

export default page;
