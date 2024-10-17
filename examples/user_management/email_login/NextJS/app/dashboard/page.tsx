import { cookies } from "next/headers";
import { nile } from "../api/[...nile]/nile";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SignOutButton from "./SignOutButton";
import { Tenant, JWT } from "@niledatabase/server";

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
      <div>Unable to get user information: {await currentUser.text()}</div>
    );
  }
  if (!currentUser) {
    return <div>User not authenticated.</div>;
  }

  const [session, tenant] = await Promise.all([
    nile.api.auth.session() as unknown as JWT,
    nile.api.tenants.getTenant(currentUser.tenants[0].id) as unknown as Tenant,
  ]);

  return (
    <div className="flex flex-col gap-4 mt-24">
      <Card>
        <CardHeader>Tenant information</CardHeader>
        <CardContent>
          <Carder>Tenant id {tenant.id}</Carder>
          <Carder>Tenant name {tenant.name}</Carder>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>User information</CardHeader>
        <CardContent>
          <Carder>id {currentUser.id}</Carder>
          <Carder>name {currentUser.givenName}</Carder>
          <Carder>email {currentUser.email}</Carder>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>Token information</CardHeader>
        <CardContent>
          <Carder>email {session.email}</Carder>
          <Carder>id {session.id}</Carder>
          <Carder>Subject {session.sub}</Carder>
          <Carder>Expiration {session.exp}</Carder>
          <Carder>Issued at {session.iat}</Carder>
          <Carder>JWT ID {session.jti}</Carder>
        </CardContent>
      </Card>
      <SignOutButton />
    </div>
  );
}
