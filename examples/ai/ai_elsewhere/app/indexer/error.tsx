'use client';
 
import { useEffect } from 'react';
import styles from '../page.module.css';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';


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
      <Typography level='title-lg'>Something went wrong!</Typography>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the route
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}