'use client';

import { UserSignupForm } from '@theniledev/react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Alert from '@mui/joy/Alert';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import NileContext from '@/nile/ui/NileContext';

export default function SignUp() {
  const [res, setRes] = useState({});
  return (
    <NileContext>
      <Stack gap={2} sx={{ maxWidth: '40ch' }}>
        <Typography level="h1">Sign up</Typography>
        {Object.keys(res).length > 0 && (
          <Stack>
            <Stack gap={2} direction="row">
              <CheckCircleOutlineIcon color="success" />
              <Typography>Sign up successful</Typography>
            </Stack>
            <Typography>Response:</Typography>
            <Alert color="success" sx={{ overflow: 'scroll' }}>
              <Typography component="pre">
                {JSON.stringify(res, null, 2)}
              </Typography>
            </Alert>
          </Stack>
        )}
        <UserSignupForm
          onSuccess={(response) => {
            setRes(response);
          }}
        />
        <p>
          Already a user? <Link href="/">Log in here</Link>
        </p>
      </Stack>
    </NileContext>
  );
}
