import styles from '../page.module.css';

import { cookies } from 'next/headers';
import AuthCookieData from '@/app/model/AuthCookieData';
import Typography from "@mui/joy/Typography";
import AuthDataPanel from "@/app/dashboard/AuthDataPanel";

export default function Dashboard() {
  const authCookie = cookies().get('authData');
  const authData = authCookie ? JSON.parse(authCookie.value) as AuthCookieData : null;

  return (
    <main className={styles.main}>
      { authData ?
        <AuthDataPanel authData={authData} /> :
        <Typography>No authentication data found in cookies.</Typography>
      }
    </main>
  )
}
