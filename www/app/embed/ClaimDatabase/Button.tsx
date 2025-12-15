'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { prepareClaim } from './action';

export default function ClaimDatabase({ domain }: { domain?: string }) {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        const res = await prepareClaim();
        if (res.ok) {
          window.location.href = `${domain}?inviteCode=${res.data.code}`;
        } else {
          // I guess some kind of error?
        }
      }}
    >
      Claim database
    </Button>
  );
}
