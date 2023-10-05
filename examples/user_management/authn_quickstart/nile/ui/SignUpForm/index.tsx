'use client';

import { UserSignupForm} from '@theniledev/react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import MUILink from '@mui/joy/Link';
import NextLink from 'next/link';
import Input from '@mui/joy/Input';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import NileContext from '@/nile/ui/NileContext';

export default function SignUp() {
  const [res, setRes] = useState({});
  const [newTenant, setNewTenant] = useState<string | undefined>();
  return (
    <NileContext>
      <Stack gap={2}>
        <Typography level="h2">Sign up</Typography>
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
                //@ts-ignore // TODO: can't figure out how to import the type definition, hopefully the transpiler is smarter
                type: "text",
                defaultValue: '',
                placeholder: 'Name for your new tenant',
                required: false,
              }
            ]
          }

          onSuccess={(response) => {
            if (response) {
              setRes(response);
            } else {
              // not supposed to happen
              setRes({});
            }

          }}
        />
        <p>
          Already a user? <MUILink href="/" component={NextLink}>Log in here</MUILink>
        </p>
      </Stack>
    </NileContext>
  );
}
