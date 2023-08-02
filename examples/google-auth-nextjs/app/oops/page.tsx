import styles from '../page.module.css';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function SignUpPage() {
  return (
    <main className={styles.main}>
      <Stack gap={2}>
        <Typography level="h1">Oops.</Typography>
        <Typography>Something went wrong.</Typography>
      </Stack>
    </main>
  );
}
