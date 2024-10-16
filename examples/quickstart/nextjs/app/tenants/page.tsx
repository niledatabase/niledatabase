import { cookies } from "next/headers";
import NextLink from "next/link";

import { AddForm } from "@/app/tenants/add-form";
import { nile } from "../api/[...nile]/nile";
import { redirect } from "next/navigation";
import SignoutButton from "./SignoutButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tenant } from "@niledatabase/server/dist/tenants";

// Forcing to re-evaluate each time.
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

function ExistingTenants({ tenants }: { tenants: Tenant[] }) {
  if (tenants.length === 0) {
    return null;
  }
  return (
    <>
      <div className="flex flex-row gap-6 items-center w-full flex-1 px-6">
        <div className="border-b h-px flex-1" />
        or
        <div className="border-b h-px flex-1" />
      </div>
      <div className="text-lg text-center p-4">Use Existing Tenant</div>
      <div className="p-6 border rounded-lg flex flex-col gap-2">
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
  const headers = new Headers({ cookie: cookies().toString() });
  const [tenants, me] = await Promise.all([
    nile.api.tenants.listTenants(headers),
    nile.api.users.me(headers),
  ]);

  if (tenants instanceof Response) {
    // signed out
    if (tenants.status === 401) {
      return redirect("/");
    }
    throw Error(await tenants.text());
  }
  if (me instanceof Response) {
    throw Error(await me.text());
  }

  return (
    <div className="">
      <Card className="py-8 px-10">
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <AddForm />
          </div>

          <ExistingTenants tenants={tenants} />
          <div className="text-sm text-center p-4">
            You are logged in as {me.email} <SignoutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
