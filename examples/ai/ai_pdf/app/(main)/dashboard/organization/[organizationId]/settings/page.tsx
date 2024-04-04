import { SubscriptionButton } from "./_components/subscription_button";
import { checkSubscription } from "@/lib/subscription";

interface pageProps {}

const page = async ({ params }: { params: { organizationId: string } }) => {
  const isPro = await checkSubscription(params.organizationId);
  return (
    <>
      <div className="mt-10">
        <SubscriptionButton isPro={isPro} orgId={params.organizationId} />
      </div>
    </>
  );
};

export default page;
