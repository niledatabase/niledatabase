import styles from '../page.module.css';

import { cookies } from 'next/headers';
import AuthCookieData from '@/app/model/AuthCookieData';
import Typography from "@mui/joy/Typography";
import MUILink from "@mui/joy/Link";
import NextLink from "next/link";
import AuthDataPanel from "@/app/dashboard/AuthDataPanel";

export default function Dashboard() {
  const authCookie = cookies().get('authData');
  const authData = authCookie ? JSON.parse(authCookie.value) as AuthCookieData : null;

  // Bail out early if the user is not authenticated
  if (!authData) {
    return (
      <div>
        <Typography>No authentication data found in cookies.</Typography>
        <Typography> <MUILink component={NextLink} href="/"> Try logging in first </MUILink> </Typography>
      </div>
    )
  }

  // we get tenant ID a bit differently on sign up vs login events
  // we'll normalize it a bit here so the downstream code doesn't have to worry about it
  if (authData.event === "LOGIN") {
    const allAud = authData.tokenData?.aud; // the audiences may include a tenant ID
    if (Array.isArray(allAud)) {
      // audiences that are not 'nile' should be tenant IDs
      // TODO: aud also includes the UUID of the database. We should filter that out too once there's a way to do it.
      const tenantAud = allAud.filter(aud => aud !== "nile")
      // we'll just show one tenant at random for now
      authData.tenantId = tenantAud[0];
    }
  }

  // if we are here, we have auth data and likely have a tenant ID too
  // regardless, lets show what we have
  return (<AuthDataPanel authData={authData} />);

}
