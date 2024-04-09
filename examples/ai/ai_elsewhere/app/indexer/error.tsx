'use client';
 
import { useEffect } from 'react';
import styles from '../page.module.css';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Link from 'next/link';


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <div className={styles.center}>
        <Stack gap={2} justifyContent="center" alignItems="center">
            <Typography level='title-lg'>Something went wrong!</Typography>
            <Button href="/" component={Link}>Login again to retry</Button>
        </Stack>
    </div>
  );
}