import React from 'react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Alert from '@mui/joy/Alert';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserLoginForm, NileProvider } from '@niledatabase/react';

export default function BasicLoginForm() {
  const [error, setError] = useState<string | null>(null);
  let navigate = useNavigate();
  return (
    <NileProvider basePath={window.location.origin+"/api"}>
      <div style={{ maxWidth: '20rem', margin: '0 auto' }}>
        <Stack gap={2} justifyContent="center" alignItems="center">
         {/* Nile's Login component calls the auth API route, which will set the right cookies. So we just need to redirect to the right page. */}
         {error && <Alert>{error}</Alert>}
        <UserLoginForm
          onSuccess={(resp) => navigate('/tenants')}
          onError={(resp) => {setError('An error has occurred. ' + resp.message);}}/>
        <Typography>
          Not a user yet? <Link to="/signup">Sign up here</Link>
        </Typography>
        </Stack>
      </div>
    </NileProvider>
  )
}
