'use client';

import { NileProvider, Okta, OktaProps } from '@theniledev/react';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import InfoIcon from '@mui/icons-material/Info';
import { useRouter } from "next/navigation";

export default function SingleSignOnSettings(props: OktaProps) {
  const { push } = useRouter();
  return (
    <NileProvider basePath={process.env.NEXT_PUBLIC_BASE_PATH}>
      <Stack gap={2} direction="column" useFlexGap >
        <Box sx={{ marginTop: '1rem' }}>
          <Link href="/">
            <Button variant="outlined">Back to login</Button>
          </Link>
        </Box>
        <Typography level="h1">Configure Okta</Typography>
        <Alert
          sx={{ alignItems: 'flex-start' }}
          startDecorator={<InfoIcon />}
          variant="soft"
          color="neutral"
        >
          <div>
            <div>Create an OKTA account to proceed with this demo. 
          You can find step by step instructions in our <Link target="_blank" rel="noopener" href="https://niledatabase-www.vercel.app/docs/user-authentication/enterprise-login/okta#set-up-okta">Okta with Next.js guide</Link>.
          </div>
          </div>
        </Alert>
        <Typography level="body-lg">
                    </Typography>
        <Okta {...props}
              onSuccess={() => {
                push('/');
              }}
        />
      </Stack>
    </NileProvider>
  );
}
