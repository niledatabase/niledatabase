'use client';

import { FormAttributeType, NileProvider, UserSignupForm } from '@theniledev/react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const { push } = useRouter();
  console.log(`exported: ${ UserSignupForm }`);
  return (
    <NileProvider basePath={process.env.NEXT_PUBLIC_BASE_PATH}>
      <Stack gap={2} sx={{ maxWidth: '40ch' }}>
        <Typography level="h1">Sign up</Typography>
        <UserSignupForm
          attributes={
            [
              {
                name: 'newTenant',
                label: 'Tenant Name',
                type: FormAttributeType.Text,
                defaultValue: '',
                required: false,
              }
            ]
          }
          onSuccess={() => {
            push('/');
          }}
        />
        <p>
          Already a user? <Link href="/">Log in here</Link>
        </p>
      </Stack>
    </NileProvider>
  );
}
