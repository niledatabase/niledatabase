import React, { useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";
import UploadButton from "@/components/upload-button";
import { checkSubscription } from "@/lib/subscription";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

const OrganizationIdPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  configureNile(cookies().get("authData"), params.organizationId);

  console.log(
    "showing boards for user " + nile.userId + " for tenant " + nile.tenantId
  );
  const resp = await nile.api.tenants.getTenant();
  const tenant = await resp.json();
  const currentFileCount = (await nile
    .db("file")
    .where({
      user_id: nile.userId,
      tenant_id: params.organizationId,
    })
    .count()) as { count: string }[];

  console.log("Current file count:", currentFileCount);
  const isPro = await checkSubscription(params.organizationId);

  return (
    <div className="w-full mb-20">
      <Info name={tenant.name} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense>
          <UploadButton count={Number(currentFileCount[0].count)} isPro={isPro} />
          <BoardList organizationId={params.organizationId} />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
