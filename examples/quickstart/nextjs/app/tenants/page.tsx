import { cookies } from 'next/headers';
import NextLink from 'next/link';

import { AddForm } from '@/app/tenants/add-form';
import { nile } from '../api/[...nile]/nile';
import { redirect } from 'next/navigation';
import SignoutButton from './SignoutButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tenant } from '@niledatabase/server';

// Forcing to re-evaluate each time.
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = 'force-no-store';

function ExistingTenants({ tenants }: { tenants: Tenant[] }) {
  if (tenants.length === 0) {
    return null;
  }
  return (
    <>
      <div className="flex w-full flex-1 flex-row items-center gap-6 px-6">
        <div className="h-px flex-1 border-b" />
        or
        <div className="h-px flex-1 border-b" />
      </div>
      <div className="p-4 text-center text-lg">Use Existing Tenant</div>
      <div className="flex flex-col gap-2 rounded-lg border p-6">
        {tenants.map((tenant: any) => (
          <NextLink href={`/tenants/${tenant.id}/todos`} key={tenant.id}>
            <Button>{tenant.name}</Button>
          </NextLink>
        ))}
      </div>
    </>
  );
}
export default async function Page() {
  const [tenants, me] = await nile.withContext(() =>
    Promise.all([nile.tenants.list(), nile.users.getSelf()]),
  );

  if (tenants instanceof Response) {
    // signed out
    if (tenants.status === 401) {
      return redirect('/');
    }
    return (
      <div>
        Unable to list tenants
        <SignoutButton />
      </div>
    );
  }
  if (me instanceof Response) {
    return (
      <div>
        Unable to authenticate <SignoutButton />
      </div>
    );
  }

  return (
    <div className="">
      <Card className="px-10 py-8">
        <CardContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <AddForm />
          </div>

          <ExistingTenants tenants={tenants} />
          <div className="p-4 text-center text-sm">
            You are logged in as {me.email} <SignoutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
