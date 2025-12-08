import Cookies from 'js-cookie';
import { Alert } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function ErrorBox() {
  const errorCookie = Cookies.get('errorData');
  const errorData = errorCookie ? JSON.parse(errorCookie) : null;

  return errorData ? (
    <Stack sx={{ mb: 2 }}>
      <Alert sx={{ mb: 1 }} color="danger">
        An error occurred during sign-in.
      </Alert>
      <Typography level="title-sm">Error details:</Typography>
      <Typography level="body-sm">{errorData?.message}</Typography>
    </Stack>
  ) : null;
}
