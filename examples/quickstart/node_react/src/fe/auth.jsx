import React from 'react';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';

import { GoogleLoginButton, NileProvider } from '@theniledev/react';

export default function Auth() {
  const [newTenant, setNewTenant] = React.useState();

  // TODO: Replace with env vars (or better yet, remove cause Nile SDK has the right default)
  return (
    <NileProvider basePath="https://api.thenile.dev">
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