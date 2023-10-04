'use client';

import { UserLoginForm } from '@theniledev/react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Alert from '@mui/joy/Alert';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import NileContext from '@/nile/ui/NileContext';

export default function Login() {
  const [res, setRes] = useState({});
  return (
    <NileContext>
      <Stack gap={2} sx={{ maxWidth: '40rem' }}>
        <Typography level="h1">Log in</Typography>
        {Object.keys(res).length > 0 && (
          <Stack gap={2}>
            <Stack gap={2} direction="row">
              <CheckCircleOutlineIcon color="success" />
              <Typography>Login successful</Typography>
            </Stack>
            <Typography>Response:</Typography>
            <Alert color="success" sx={{ overflow: 'scroll' }}>
              <Typography component="pre">
                {JSON.stringify(res, null, 2)}
              </Typography>
            </Alert>
          </Stack>
        )}
        <UserLoginForm
          onSuccess={(response) => {
            setRes(response);
          }}
        />
        <p>
          Not a user yet? <Link href="/sign-up">Sign up here</Link>
        </p>
      </Stack>
    </NileContext>
  );
}
