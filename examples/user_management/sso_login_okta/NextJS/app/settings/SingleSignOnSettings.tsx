'use client';

import { NileProvider, Okta, OktaProps } from '@theniledev/react';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import { useRouter } from "next/navigation";

export default function SingleSignOnSettings(props: OktaProps) {
  const { push } = useRouter();
  return (
    <NileProvider basePath={process.env.NEXT_PUBLIC_BASE_PATH}>
      <Stack gap={2}>
        <Box>
          <Link href="/">
            <Button variant="outlined">Back to login</Button>
          </Link>
        </Box>
        <Typography level="h1">Configure Okta</Typography>
        <Okta {...props}
              onSuccess={() => {
                push('/');
              }}
        />
      </Stack>
    </NileProvider>
  );
}
