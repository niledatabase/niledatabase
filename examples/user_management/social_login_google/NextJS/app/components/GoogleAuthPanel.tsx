'use client';

import React from 'react';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';

import { GoogleLoginButton, NileProvider } from '@theniledev/react';

export default function GoogleAuthPanel() {
  const [newTenant, setNewTenant] = React.useState<string | undefined>();

  return (
    <NileProvider basePath={process.env.NEXT_PUBLIC_NILE_API}>
      <div style={{ maxWidth: '20rem', margin: '0 auto' }}>
        <Stack gap={2}>
          <Stack>
            <Input
              size="sm"
              placeholder="Tenant Name"
              onChange={(event) => setNewTenant(event.target.value)}
            />
          </Stack>
          <GoogleLoginButton
            workspace={process.env.NEXT_PUBLIC_WORKSPACE}
            database={process.env.NEXT_PUBLIC_DATABASE}
            newTenantName={newTenant}
          />
        </Stack>
      </div>
    </NileProvider>
  )
}
