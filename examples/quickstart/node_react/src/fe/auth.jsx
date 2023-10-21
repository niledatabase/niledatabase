import React from 'react';
import Stack from '@mui/joy/Stack';
import styles from './css/page.module.css'
import Cookies from 'js-cookie';
import { useSearchParams } from 'react-router-dom';

import { GoogleLoginButton, NileProvider} from '@niledatabase/react';



export default function Auth() {
  // handle logouts here
  const [searchParams] = useSearchParams();
  if (searchParams.has('logout')) {
    Cookies.remove('authData');
  }

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