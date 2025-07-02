import { cookies } from "next/headers";
import NextLink from "next/link";

import { AddForm } from "@/app/tenants/add-form";
import { nile } from "../api/[...nile]/nile";
import { redirect } from "next/navigation";
import SignoutButton from "./SignoutButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tenant } from "@niledatabase/server";

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
  const [tenants, me] = await Promise.all([
    nile.tenants.list(),
    nile.users.getSelf(),
  ]);

  if (tenants instanceof Response) {
    // signed out
    if (tenants.status === 401) {
      return redirect("/");
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
