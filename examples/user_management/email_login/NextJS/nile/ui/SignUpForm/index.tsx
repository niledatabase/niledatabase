'use client';

import { UserSignupForm} from '@niledatabase/react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import MUILink from '@mui/joy/Link';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import NileContext from '@/nile/ui/NileContext';

export default function SignUp() {
  const [res, setRes] = useState({});
  const [newTenant, setNewTenant] = useState<string | undefined>();
  const { push } = useRouter();
  return (
    <NileContext>
      <Stack gap={2}>
        {Object.keys(res).length > 0 && (
          <Stack>
            <Stack gap={2} direction="row">
              <CheckCircleOutlineIcon color="success" />
              <Typography>Sign up successful! Go ahead and  <MUILink href="/" component={NextLink}>Log in</MUILink></Typography>
            </Stack>
          </Stack>
        )}
        <UserSignupForm
          attributes={
            [
              {
                name: 'newTenant',
                label: 'Tenant Name',
                //@ts-ignore // TODO: can't figure out how to import the type definition
                defaultValue: '',
                placeholder: 'Name for your new tenant',
                required: false,
              }
            ]
          }

          onSuccess={(response) => {push('/');}}
        />
        <p>
          Already a user? <MUILink href="/" component={NextLink}>Log in here</MUILink>
        </p>
      </Stack>
    </NileContext>
  );
}
