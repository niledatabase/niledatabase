import styles from '../page.module.css';

import { cookies } from 'next/headers';
import Typography from "@mui/joy/Typography";
import AuthDataPanel from "./AuthDataPanel";

export default function Dashboard() {
  const userToken = cookies().get('token')?.value

  return (
    <div>
      { userToken ?
        <AuthDataPanel token={userToken} />:
        <Typography>No authentication data found in cookies.</Typography>
      }
      </div>
  )
}
