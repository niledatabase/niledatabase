import { SubscriptionButton } from './_components/subscription_button';
import { checkSubscription } from '@/lib/subscription';

interface pageProps {}

const page = async ({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) => {
  const { organizationId } = await params;
  const isPro = await checkSubscription(organizationId);
  return (
    <>
      <div className="mt-10">
        <SubscriptionButton isPro={isPro} orgId={organizationId} />
      </div>
    </>
  );
};

export default page;
