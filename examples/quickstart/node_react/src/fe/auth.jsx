import React from 'react';
import Stack from '@mui/joy/Stack';
import styles from './css/page.module.css'

import { GoogleLoginButton, NileProvider} from '@theniledev/react';

export default function Auth() {
  // TODO: Replace with env vars (or better yet, remove cause Nile SDK has the right default)
  return (
    <NileProvider basePath={process.env.REACT_APP_NILE_API}>
    <div>
      <div className={styles.center}>
        <Stack gap={5} sx={{ maxWidth: '40rem' }} alignItems={'center'}>
          <GoogleLoginButton
            workspace={process.env.REACT_APP_NILE_WORKSPACE}
            database={process.env.REACT_APP_NILE_DATABASE}
          />
        </Stack>
      </div>
      </div>
    </NileProvider>
  )
}