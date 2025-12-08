import { cookies } from 'next/headers';
import { nile } from '../api/[...nile]/nile';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import SignOutButton from './SignOutButton';
import { Tenant, ActiveSession, JWT } from '@niledatabase/server';
import { Ban } from 'lucide-react';
import {
  PasswordResetForm,
  TenantSelector,
  UserInfo,
} from '@niledatabase/react';

function Carder({
  children,
}: {
  children: Array<JSX.Element | string | undefined | number | null>;
}) {
  return (
    <div className="flex flex-row justify-between gap-4">
      <div className="min-w-24">{children[0]}</div>
      <div className="flex-1 text-left">{children[1]}</div>
    </div>
  );
}
export default async function Dashboard() {
  const currentUser = await nile.users.getSelf();

  if (currentUser instanceof Response) {
    return (
      <div className="mt-24 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2 text-4xl">
            <Ban className="stroke-red-600" size={40} /> Unable to get user
            information
          </div>
          <div>Reason: {await currentUser.text()}</div>
        </div>
        <div>
          <SignOutButton text="Back to Sign in" />
        </div>
      </div>
    );
  }

  const requests: [ActiveSession, Tenant[]] = [
    nile.auth.getSession() as unknown as ActiveSession,
    nile.tenants.list() as unknown as Tenant[],
  ];
  const [session, tenants] = await Promise.all(requests);

  return (
    <div className="mt-24 flex flex-col gap-4">
      <Card>
        <TenantSelector
          className="p-10"
          tenants={tenants}
          activeTenant={tenants[0]?.id}
        />
      </Card>
      <Card>
        <UserInfo user={currentUser} className="p-4" />
      </Card>
      <Card>
        <CardHeader>Token information</CardHeader>
        <CardContent>
          <Carder>email {session.user?.email}</Carder>
          <Carder>user id {session.user?.id}</Carder>
          <Carder>expires {new Date(session.expires).toLocaleString()}</Carder>
        </CardContent>
      </Card>
      <PasswordResetForm defaultValues={{ email: currentUser.email }} />
      <SignOutButton />
    </div>
  );
}
