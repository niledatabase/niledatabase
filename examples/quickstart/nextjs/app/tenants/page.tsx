import Server from "@theniledev/server";
import { cookies } from 'next/headers';
import styles from '../page.module.css';
import { getUserId, getUserName } from "@/utils/AuthUtils";
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


// Forcing to re-evaluate each time. 
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = 'force-no-store'

const { api, db } = Server({
    workspace: String(process.env.NEXT_PUBLIC_WORKSPACE),
    database: String(process.env.NEXT_PUBLIC_DATABASE),
    api: {
      basePath: String(process.env.NEXT_PUBLIC_NILE_API),
    },
    db: {
      connection: {
        host: process.env.NILE_DB_HOST,
        user: process.env.NILE_USER,
        password: process.env.NILE_PASSWORD,
      },
    },
  });

export default async function Page() {
  console.log(db.client.config.connection)
  const userId = getUserId(cookies().get('authData'))
  const userName = getUserName(cookies().get('authData'));
  let tenants:any = [];
  
  if (userId) {
    // TODO: Replace with API call to get tenants for user when the SDK supports this
    tenants = await db("tenants")
      .select("tenants.id","tenants.name")
      .join("users.tenant_users", "tenants.id", "=", "tenant_users.tenant_id")
      .where("tenant_users.user_id", "=", userId);
  };

  console.log('tenants', tenants)
  return (
        <div className={styles.center}>
          <Card  variant="outlined"> {/* TODO: need drop shadow */}
          {/* TODO: Avatar or Icon with small DB image*/}
          <CardContent > 
            <Typography level="title-md" textAlign="center">Select Tenant</Typography>
            <div style={{display: 'flex', justifyContent: 'center', padding:'1rem'}}><AddForm /></div>
          </CardContent>
          <Divider>or</Divider>
          <CardContent> 
            <Typography level="title-md" textAlign="center" padding={2}>Use Existing Tenant
            </Typography>
            <List variant="outlined">
              {tenants.map((tenant: any) => (
                    <ListItem key={tenant.id}>
                      <ListItemButton><NextLink href={`/tenants/${tenant.id}/todos`}>{tenant.name}</NextLink></ListItemButton>
                    </ListItem>
                ))}
            </List>
          </CardContent>
          <CardContent>
                <Typography level="body-md" textAlign="center"> You are logged in as {userName} <MUILink href="/logout" component={NextLink}>(Logout)</MUILink></Typography>
          </CardContent>
          </Card>

        </div>
  );
}