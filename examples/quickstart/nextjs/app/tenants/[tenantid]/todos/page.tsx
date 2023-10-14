
import styles from '@/app/page.module.css';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import Stack from '@mui/joy/Stack';
import NextLink from 'next/link'
import MUILink from '@mui/joy/Link';
import Server from "@theniledev/server";
import { cookies } from 'next/headers';
import { getUserId, getUserToken } from "@/utils/AuthUtils";
import { AddForm } from "./add-form"
import { DoneForm } from "./done-form"

// Forcing to re-evaluate each time. 
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = 'force-no-store'


const nile = Server({
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

// Todo: replace "raw" context setting with nicer SDK
export default async function Page({ params }: { params: { tenantid: string } }) {
    console.log(nile.db.client.config.connection)
    const userId = getUserId(cookies().get('authData'))
    const userToken = getUserToken(cookies().get('authData'));
    nile.token = userToken; // set token for authenticating subsequent operations
    const tenantID = params.tenantid;
    nile.tenantId = tenantID; // set tenant ID for subsequenct operations

    console.log("tenantID:" + tenantID);
    console.log("userId:" + userId);

    let todos:any = [];

    if (tenantID && userId) {
        const res = await nile.db.raw(`
        set nile.tenant_id = '${tenantID}'; 
        set nile.user_id = '${userId}';
        SELECT * FROM todos order by title`) 
        todos = res[2].rows || []; // we only need the result of the query itself
    }

    // Get tenant name doesn't need any input parameters because it uses the tenant ID from the context
    const resp = await nile.api.tenants.getTenant();
    const tenant = await resp.json();
    console.log(tenant)

    console.log('todos', todos)

    return (
            <Stack spacing={2} width={"50%"}>
              <Typography level="h2" textAlign={"center"} sx={{textTransform: 'uppercase', margin:"10px"}}>{tenant.name}&apos;s Todos</Typography>
              <MUILink href="/tenants" component={NextLink} justifyContent={"center"}>(Back to tenant selection) </MUILink>
              <List variant="plain" size="lg">
                <ListItem>
                  <AddForm tenantid={tenantID} />
                </ListItem>
                <ListDivider />
                  {todos.map((todo: any) => (
                    <div key={todo.id} style={{display: 'flex', flexWrap:'nowrap', padding: '0.5rem'}}>
                      {/* TODO: todos need IDs */}
                      <ListItem key={todo.id}>
                      <DoneForm tenantid={tenantID} title={todo.title} complete={todo.complete}/>
                      </ListItem>
                      <ListDivider />
                    </div>
                  ))}
              </List>
            </Stack>
    );

  }