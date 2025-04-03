import { Card } from "@/components/ui/card";
import { configureNile } from "@/lib/NileServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FC } from "react";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AddOrgButton from "./_components/add-org-button";
import Link from "next/link";
import { Navbar } from "@/app/(marketing)/_components/navbar";

interface pageProps {}

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

const page: FC<pageProps> = async ({}) => {
  const nile = await configureNile();
  console.log("showing tenants page for user: " + nile.userId);
  const tenants = await nile.api.tenants.listTenants();
  if (!nile.userId || !Array.isArray(tenants)) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      {/* <div className="mt-24">Select Org or Create org logic will come here</div> */}
      <div className="ml-[5vw] flex flex-col justify-center items-center mt-24">
        <Card className="max-w-sm p-3 flex flex-col items-center justify-center">
          <AddOrgButton count={tenants.length} />
        </Card>
        <Separator className="max-w-xl my-5" />
        <Label className="text-lg">Your Workspaces</Label>
        {tenants.length === 0 && (
          <>
            <h1 className="mt-3">
              You are not part of any workspace. This should not have happened.{" "}
            </h1>
          </>
        )}
        {tenants.map((tenant: { id: string; name: string }) => (
          <Link
            href={`/dashboard/organization/${tenant.id}`}
            className="group space-y-3 mt-3"
            key={tenant.id}
          >
            <Card
              key={tenant.id}
              className="p-5 text-center group-hover:text-indigo-400"
            >
              <h1>{tenant.name}</h1>
              <h1>{tenant.id}</h1>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default page;
