import { cookies } from "next/headers";
import { nile } from "../api/[...nile]/nile";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tenant, ActiveSession, Providers } from "@niledatabase/server";
import { Ban } from "lucide-react";
import {
  EmailSignInButton,
  PasswordResetForm,
  SignOutButton,
  TenantSelector,
  UserInfo,
} from "@niledatabase/react";
import VerifyEmailButton from "./VerifyEmailButton";
// import "@niledatabase/react/styles.css";

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
  const nextCookies = await cookies();
  nile.api.headers = new Headers({ cookie: nextCookies.toString() });

  const currentUser = await nile.api.users.me();
  const res = await nile.api.auth.signOut();
  console.log(res, "signed o ut?");

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
          <SignOutButton text="Back to Sign in" callbackUrl="/" />
        </div>
      </div>
    );
  }

  const requests: [ActiveSession, Tenant[], Providers] = [
    nile.api.auth.getSession() as unknown as ActiveSession,
    nile.api.tenants.listTenants() as unknown as Tenant[],
    nile.api.auth.listProviders() as unknown as Providers,
  ];

  const [session, tenants, providers] = await Promise.all(requests);
  // this has secrets in it, so just get what we need
  const userProviders = await nile.db.query(
    "select * from auth.credentials where user_id = $1",
    [currentUser.id]
  );
  const data =
    userProviders && "rows" in userProviders
      ? userProviders.rows.map(({ provider, method }) => ({ provider, method }))
      : [];
  const usesPassword = data.find(({ method }) => method === "EMAIL_PASSWORD");
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
        <div className="flex flex-row gap-2 px-4 justify-center">
          {Object.keys(providers).map((p) => {
            const enabled = data.some(({ provider, method }) => {
              return (
                provider === p ||
                (["email", "credentials"].includes(p) &&
                  method === "EMAIL_PASSWORD")
              );
            });
            return (
              <div
                className={`rounded-lg border py-0.5 px-2 text-sm ${
                  enabled ? "bg-green-700 text-white" : ""
                }`}
                key={p}
              >
                {p}
              </div>
            );
          })}
        </div>
        {usesPassword ? (
          <PasswordResetForm
            className="p-4"
            defaultValues={{ email: currentUser.email }}
            hideEmail
          />
        ) : (
          <div className="flex items-center p-4 justify-center flex-col gap-4">
            <VerifyEmailButton email={currentUser.email} />
          </div>
        )}
      </Card>
      <Card>
        <CardHeader>Token information</CardHeader>
        <CardContent>
          <Carder>email {session?.user?.email}</Carder>
          <Carder>id {session?.user?.id}</Carder>
          <Carder>expires {new Date(session?.expires).toLocaleString()}</Carder>
        </CardContent>
      </Card>
      <SignOutButton callbackUrl="/" />
    </div>
  );
}
