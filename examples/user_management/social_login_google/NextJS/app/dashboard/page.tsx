import { cookies } from "next/headers";
import { nile } from "../api/[...nile]/nile";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SignOutButton from "./SignOutButton";
import { Tenant, JWT } from "@niledatabase/server";
import { Ban } from "lucide-react";

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
type TenantResponseType = undefined | Response | Tenant;
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
          <SignOutButton text="Back to Sign in" />
        </div>
      </div>
    );
  }

  const requests: [JWT, TenantResponseType] = [
    nile.api.auth.session() as unknown as JWT,
    undefined,
  ];
  if (currentUser.tenants.length) {
    requests[1] = nile.api.tenants.getTenant(
      currentUser.tenants[0].id
    ) as unknown as Tenant;
  }
  const [session, tenant] = await Promise.all(requests);

  return (
    <div className="flex flex-col gap-4 mt-24">
      {!(tenant instanceof Response) ? (
        <Card>
          <CardHeader>Tenant information</CardHeader>
          <CardContent>
            <Carder>Tenant id {tenant?.id}</Carder>
            <Carder>Tenant name {tenant?.name}</Carder>
          </CardContent>
        </Card>
      ) : null}
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
