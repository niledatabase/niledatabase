import React from 'react';
import Stack from '@mui/joy/Stack';
import styles from './css/page.module.css'
import Layout from './layout';

import { GoogleLoginButton, NileProvider} from '@theniledev/react';

export default function Auth() {
  const [newTenant, setNewTenant] = React.useState();
  // TODO: Replace with env vars (or better yet, remove cause Nile SDK has the right default)
  return (
    <Layout>
    <NileProvider basePath={process.env.REACT_APP_NILE_API}>
    <div>
      <div className={styles.center}>
        <Stack gap={5} sx={{ maxWidth: '40rem' }} alignItems={'center'}>
          <GoogleLoginButton
            workspace={process.env.REACT_APP_NILE_WORKSPACE}
            database={process.env.REACT_APP_NILE_DATABASE}
            newTenantName={newTenant}
          />
        </Stack>
      </div>
      </div>
    </NileProvider>
    </Layout>
  )
}