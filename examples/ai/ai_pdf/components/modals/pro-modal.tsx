'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useProModal } from '@/hooks/use-pro-modal';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAction } from '@/hooks/use-action';
import { toast } from 'sonner';
import { stripeRedirect } from '@/app/(main)/dashboard/organization/[organizationId]/settings/actions/stripe-redirect';

//@ts-ignore
export const ProModal = (orgId) => {
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
    execute({ orgId });
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="relative flex aspect-video items-center justify-center">
          <Image src="/parrot.jpg" alt="Hero" className="object-cover" fill />
        </div>
        <div className="mx-auto space-y-6 p-6 text-primary">
          <h2 className="text-xl font-semibold">
            Upgrade to KnowledgeAI Pro Today!
          </h2>
          <Button
            disabled={isLoading}
            onClick={onClick}
            className="w-full"
            variant="default"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
