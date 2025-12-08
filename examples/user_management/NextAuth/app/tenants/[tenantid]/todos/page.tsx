import styles from '@/app/page.module.css';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import Stack from '@mui/joy/Stack';
import NextLink from 'next/link';
import MUILink from '@mui/joy/Link';
import { AddForm } from './add-form';
import { DoneForm } from './done-form';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { nile } from '@/lib/nile';
// Forcing to re-evaluate each time.
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = 'force-no-store';

// Todo: replace "raw" context setting with nicer SDK
export default async function Page({
  params,
}: {
  params: Promise<{ tenantid: string }>;
}) {
  // Here we are getting a connection to a specific tenant database for the current usr
  // if we already got such connection earlier, it will reuse the existing one
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const userId = session?.user?.id;

  const tenantId = (await params).tenantid;
  const [todos, resp] = await nile.withContext(
    { tenantId, userId },
    ({ query }) =>
      Promise.all([
        query('SELECT * FROM todos ORDER BY title'),
        query('SELECT name FROM tenants'),
      ]),
  );

  console.log(
    'showing todos for user ' +
      userId +
      ' for tenant ' +
      nile.getContext().tenantId,
  );
  const tenant = resp.rows[0].name;
  return (
    <Stack spacing={2} width={'50%'}>
      <Typography
        level="h2"
        textAlign={'center'}
        sx={{ textTransform: 'uppercase' }}
      >
        {tenant}&apos;s Todos
      </Typography>
      <MUILink href="/tenants" component={NextLink} justifyContent={'center'}>
        (Back to tenant selection){' '}
      </MUILink>
      <List variant="plain" size="lg">
        <ListItem>
          <AddForm tenantid={tenantId} />
        </ListItem>
        <ListDivider />
        {todos.rows.map((todo: any) => (
          <div
            key={todo.id}
            style={{ display: 'flex', flexWrap: 'nowrap', padding: '0.5rem' }}
          >
            <ListItem key={todo.id}>
              <DoneForm tenantId={tenantId} todo={todo} />
            </ListItem>
            <ListDivider />
          </div>
        ))}
      </List>
    </Stack>
  );
}
