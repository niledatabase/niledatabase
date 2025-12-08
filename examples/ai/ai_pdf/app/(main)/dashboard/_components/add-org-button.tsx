'use client';
import { Button } from '@/components/ui/button';
import { MAX_FREE_TENANTS } from '@/constants/limits';
import { useOrgs } from '@/hooks/use-orgs';
import { FC } from 'react';

interface AddOrgButtonProps {
  count: number;
}

// Note that right now everyone is limited to 1 tenant, so this button is always disabled
// TODO: Implement pro plan to allow more tenants for one user
const AddOrgButton: FC<AddOrgButtonProps> = ({ count }) => {
  const orgs = useOrgs();
  return (
    <>
      {count < MAX_FREE_TENANTS ? (
        <>
          <Button onClick={orgs.onOpen} disabled>
            Create Workspace
          </Button>
          <h1 className="mt-5 text-sm">
            Your free workspace is getting created. Refresh this page if you see
            this message.
          </h1>
        </>
      ) : (
        <>
          {' '}
          <Button onClick={orgs.onOpen} disabled>
            Create Workspace
          </Button>
          <h1 className="mt-5 text-sm">
            You can create upto 1 workspace with the free plan
          </h1>
        </>
      )}
    </>
  );
};

export default AddOrgButton;
