import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { configureNile } from "@/lib/NileServer";
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
  const tenantNile = configureNile(
    cookies().get("authData"),
    params.organizationId
  );

  console.log(
    "showing boards for user " +
      tenantNile.userId +
      " for tenant " +
      tenantNile.tenantId
  );
  const resp = await tenantNile.api.tenants.getTenant();
  const tenant = await resp.json();
  const currentFileCount = await tenantNile.db.query(
    "select count(*) from file"
  );

  console.log("Current file count:", currentFileCount);
  const isPro = await checkSubscription(params.organizationId);

  return (
    <div className="w-full mb-20">
      <Info name={tenant.name} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense>
          <UploadButton
            org_id={params.organizationId}
            count={Number(currentFileCount.rows[0].count)}
            isPro={isPro}
          />
          <Card style={{ marginBottom: 24 }}>
            <CardHeader>
              <CardTitle>
                Need ideas for good papers to upload? Here are some suggestions:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li>
                    <a
                      href="https://lamport.azurewebsites.net/pubs/time-clocks.pdf"
                      target="_blank"
                      className="underline"
                    >
                      Time, Clocks, and the Ordering of Events in a Distributed
                      System{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.usenix.org/legacy/events/hotos03/tech/full_papers/candea/candea.pdf"
                      target="_blank"
                      className="underline"
                    >
                      Crash Only Software
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://dl.acm.org/doi/pdf/10.1145/359340.359342"
                      target="_blank"
                      className="underline"
                    >
                      A Method for Obtaining Digital Signatures and PublicKey
                      Cryptosystems
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://diyhpl.us/~bryan/papers2/distributed/distributed-systems/zab.totally-ordered-broadcast-protocol.2008.pdf"
                      target="_blank"
                      className="underline"
                    >
                      A simple totally ordered broadcast protocol
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/papers-we-love/papers-we-love/blob/main/distributed_systems/harvest-yield-and-scalable-tolerant-systems.pdf"
                      target="_blank"
                      className="underline"
                    >
                      Harvest, yield, and scalable tolerant systems
                    </a>
                  </li>
                </ul>
              </p>
            </CardContent>
          </Card>
          <BoardList organizationId={params.organizationId} />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
