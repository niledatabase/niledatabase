import { cookies } from "next/headers";
import { nile } from "../api/[...nile]/nile";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tenant, ActiveSession, JWT } from "@niledatabase/server";
import { Ban } from "lucide-react";
import { SignOutButton, TenantSelector, UserInfo } from "@niledatabase/react";
import "@niledatabase/react/styles.css";

function Carder({
  children,
}: {
  children: Array<JSX.Element | string | undefined | number | null>;
}) {
  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="min-w-24">{children[0]}</div>
      <div className="text-left flex-1">{children[1]}</div>
    </div>
  );
}
export default async function Dashboard() {
  const nextCookies = cookies();
  nile.api.headers = new Headers({ cookie: nextCookies.toString() });

  const currentUser = await nile.api.users.me();

  if (currentUser instanceof Response) {
    return (
      <div className="mt-24 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="text-4xl flex flex-row gap-2 items-center">
            <Ban className="stroke-red-600" size={40} /> Unable to get user
            information
          </div>
          <div>Reason: {await currentUser.text()}</div>
        </div>
        <div>
          <SignOutButton buttonText="Back to Sign in" callbackUrl="/" />
        </div>
      </div>
    );
  }

  const requests: [ActiveSession, Tenant[]] = [
    nile.api.auth.getSession() as unknown as ActiveSession,
    nile.api.tenants.listTenants() as unknown as Tenant[],
  ];
  const [session, tenants] = await Promise.all(requests);

  return (
    <div className="flex flex-col gap-4 mt-24">
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
          <Carder>id {session.user?.id}</Carder>
          <Carder>expires {new Date(session.expires).toLocaleString()}</Carder>
        </CardContent>
      </Card>
      <SignOutButton />
    </div>
  );
}
