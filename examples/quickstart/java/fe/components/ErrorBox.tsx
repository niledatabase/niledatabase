import { cookies } from 'next/headers';
import styles from './ErrorBox.module.css';

export default async function ErrorBox() {
  const errorCookie = (await cookies()).get('errorData');
  const errorData = errorCookie ? JSON.parse(errorCookie.value) : null;

  return errorData ? (
    <div className={styles['error-stack']}>
      <div className={styles['error-alert']}>
        An error occurred during sign-in.
      </div>
      <p className={styles['error-title']}>Error details:</p>
      <p className={styles['error-message']}>{errorData?.message}</p>
    </div>
  ) : null;
}
