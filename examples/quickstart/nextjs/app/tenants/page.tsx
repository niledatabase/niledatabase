import { cookies } from 'next/headers';
import styles from '../page.module.css';
import { configureNile, getUserName } from "@/lib/AuthUtils";
import NextLink from 'next/link'
import MUILink from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import {AddForm} from '@/app/tenants/add-form';
import nile from '@/lib/NileServer'

// Forcing to re-evaluate each time. 
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = 'force-no-store'

export default async function Page() {
  configureNile(cookies().get('authData'), null); // we don't have a tenant yet
  console.log("showing tenants page for user: " + nile.userId);
  let tenants:any = [];
  
  if (nile.userId) {
    // TODO: Replace with API call to get tenants for user when the SDK supports this
    tenants = await nile.db("tenants")
      .select("tenants.id","tenants.name")
      .join("users.tenant_users", "tenants.id", "=", "tenant_users.tenant_id")
      .where("tenant_users.user_id", "=", nile.userId);
  };

  return (
        <div className={styles.center}>
          <Card  variant="outlined"> {/* TODO: need drop shadow */}
          {/* TODO: Avatar or Icon with small DB image*/}
          <CardContent > 
            <div style={{display: 'flex', justifyContent: 'center', padding:'1rem'}}><AddForm /></div>
          </CardContent>
          <Divider>or</Divider>
          <CardContent> 
            <Typography level="title-md" textAlign="center" padding={2}>Use Existing Tenant
            </Typography>
            <List variant="outlined">
              {tenants.map((tenant: any) => (
                    <ListItem key={tenant.id}>
                      <ListItemButton component={NextLink} href={`/tenants/${tenant.id}/todos`}>{tenant.name}</ListItemButton>
                    </ListItem>
                ))}
            </List>
          </CardContent>
          <CardContent>
                <Typography level="body-md" textAlign="center"> You are logged in as {getUserName(cookies().get('authData'))} <MUILink href="/logout" component={NextLink}>(Logout)</MUILink></Typography>
          </CardContent>
          </Card>
        </div>
  );
}