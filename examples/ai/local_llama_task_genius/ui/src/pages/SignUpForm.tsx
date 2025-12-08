import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Alert from '@mui/joy/Alert';
import Layout from '../layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NileProvider, UserSignupForm } from '@niledatabase/react';

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  console.log(window.location.origin);
  return (
    <Layout>
      <NileProvider appUrl={window.location.origin + '/api'}>
        <Stack gap={2} sx={{ maxWidth: '40ch' }}>
          <Typography level="h1">Sign up</Typography>
          {error && <Alert>{error}</Alert>}
          <UserSignupForm
            onSuccess={() => navigate('/tenants')}
            onError={() => {
              setError('an error has occurred.');
            }}
          />
          <p>
            Already a user? <Link href="/">Log in here</Link>
          </p>
        </Stack>
      </NileProvider>
    </Layout>
  );
}
