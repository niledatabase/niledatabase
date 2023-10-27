import styles from '@/app/page.module.css';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import Stack from '@mui/joy/Stack';
import NextLink from 'next/link'
import MUILink from '@mui/joy/Link';
import { cookies } from 'next/headers';
import { configureNile, getUserId, getUserToken } from "@/lib/AuthUtils";
import { AddForm } from "./add-form"
import { DoneForm } from "./done-form"
import nile from '@/lib/NileServer';

// Forcing to re-evaluate each time. 
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = 'force-no-store'

// Todo: replace "raw" context setting with nicer SDK
export default async function Page({ params }: { params: { tenantid: string } }) {

    configureNile(cookies().get('authData'), params.tenantid);

    console.log("showing todos for user " + nile.userId + " for tenant " + nile.tenantId);
    const todos = await nile.db("todos").select("*"); // no need for where clause because we previously set Nile context
    console.log("todos:" + JSON.stringify(todos));
    // Get tenant name doesn't need any input parameters because it uses the tenant ID from the context
    const resp = await nile.api.tenants.getTenant();
    const tenant = await resp.json();
    return (
            <Stack spacing={2} width={"50%"}>
              <Typography level="h2" textAlign={"center"} sx={{textTransform: 'uppercase',}}>{tenant.name}&apos;s Todos</Typography>
                <MUILink href="/tenants" component={NextLink} justifyContent={"center"}>(Back to tenant selection) </MUILink>
              <List variant="plain" size="lg">
                <ListItem>
                  <AddForm tenantid={nile.tenantId!} />
                </ListItem>
                <ListDivider />
                  {todos.map((todo: any) => (
                    <div key={todo.id} style={{display: 'flex', flexWrap:'nowrap', padding: '0.5rem'}}>
                      {/* TODO: todos need IDs */}
                      <ListItem key={todo.id}>
                      <DoneForm tenantId={nile.tenantId!} title={todo.title} complete={todo.complete}/>
                      </ListItem>
                      <ListDivider />
                    </div>
                  ))}
              </List>
            </Stack>
    );
  }