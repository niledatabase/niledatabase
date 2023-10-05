import styles from '../page.module.css';

import { cookies } from 'next/headers';
import Typography from "@mui/joy/Typography";
import AuthDataPanel from "./AuthDataPanel";

export default function Dashboard() {
  const userToken = cookies().get('token')?.value

  return (
    <main className={styles.main}>
      { userToken ?
        <AuthDataPanel token={userToken} />:
        <Typography>No authentication data found in cookies.</Typography>
      }
    </main>
  )
}
