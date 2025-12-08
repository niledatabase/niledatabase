'use client';

import { useEffect, useState } from 'react';
import { ProModal } from '@/components/modals/pro-modal';
import { OrganizationModal } from '../modals/orgs-modal';
import { ConfirmModal } from '../modals/confirm-modal';
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <OrganizationModal />
      <ProModal orgId={'no tenant'} />
    </>
  );
};
