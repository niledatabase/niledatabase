import { cookies } from "next/headers";
import styles from "../page.module.css";
import NextLink from "next/link";
import { nile } from "../api/[...nile]/nile";
import { redirect } from "next/navigation";
import { SignOutButton } from "@niledatabase/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Forcing to re-evaluate each time.
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function Page() {
  const headers = new Headers({ cookie: (await cookies()).toString() });

  const [tenants, me] = await Promise.all([
    nile.api.tenants.listTenants(headers),
    nile.api.users.me(headers),
  ]);

  if (tenants instanceof Response) {
    // signed out
    if (tenants.status === 401) {
      return redirect("/");
    }
    return (
      <div>
        Unable to list tenants
        <SignOutButton callbackUrl="/" />
      </div>
    );
  }
  if (me instanceof Response) {
    return (
      <div>
        Unable to authenticate <SignOutButton callbackUrl="/" />
      </div>
    );
  }
  return (
    <div className={styles.center}>
      <Card>
        <CardHeader className="text-lg">Select tenant</CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>Pick an organization/tenant below</div>
          <ol className="flex flex-col gap-2">
            {tenants.map((tenant: any) => (
              <li key={tenant.id}>
                <Link href={`/tenants/${tenant.id}/ask`}>
                  <Button>{tenant.name}</Button>
                </Link>
              </li>
            ))}
          </ol>
          <div className="flex flex-col items-center justify-center gap-3">
            You are logged in as {me.email}
            <SignOutButton callbackUrl="/" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
