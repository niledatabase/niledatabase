"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "../actions/stripe-redirect";

interface SubscriptionButtonProps {
  orgId: string,
  isPro: boolean,
}

export const SubscriptionButton = ({ orgId, isPro }: SubscriptionButtonProps) => {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    // Disable for now
    toast.warning("Subscription management is not currently available. Coming soon! Contact support for assistance.");
    /*if (isPro) {
      execute({orgId});
    } else {
      proModal.onOpen();
    }*/
  };

  return (
    <Button variant="default" onClick={onClick} disabled={isLoading}>
      {isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  );
};
