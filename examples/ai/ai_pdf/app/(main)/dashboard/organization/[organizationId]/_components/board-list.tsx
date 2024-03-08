import Link from "next/link";
// import { auth } from "@clerk/nextjs";
import { File } from "lucide-react";

// import { db } from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";
// import { FormPopover } from "@/components/form/form-popover";
import nile from "@/lib/NileServer";
// import { getAvailableCount } from "@/lib/org-limit";
// import { checkSubscription } from "@/lib/subscription";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import IndexButton from "./index-button";
import { TrashBox } from "./trash-box";

export const BoardList = async ({
  organizationId,
}: {
  organizationId: string;
}) => {
  //   const { orgId } = auth();

  //   if (!orgId) {
  //     return redirect("/select-org");
  //   }

  //   const boards = await db.board.findMany({
  //     where: {
  //       orgId,
  //     },
  //     orderBy: {
  //       createdAt: "desc"
  //     }
  //   });

  //   const availableCount = await getAvailableCount();
  //   const isPro = await checkSubscription();
  // configureNile(cookies().get("authData"), organizationId);
  const files = await nile
    .db("file")
    .select("*")
    .where({ tenant_id: organizationId });
  // .orderBy("created_at", "desc"); // no need for where clause because we previously set Nile context
  console.log(files.length);

  // if(!boards.length === 0) {
  //   return <div>No boards</div>
  // }
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-primary text-neutral-700">
        <File className="h-6 w-6 mr-2" />
        Files
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <Card key={index} className="w-[300px] h-fit">
            <CardHeader>
              <CardTitle>{file.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Index status">
                    Index: {file.isIndex ? "Done" : "Not Done"}
                  </Label>
                  <Label htmlFor="Page Amount">
                    Page Amount: {file.pageAmt}
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {/* {file.uploadStatus === "SUCCESS" && ( */}
              <>
                {file.isIndex ? (
                  <Link href={`${file.tenant_id}/chat/${file.id}`}>Chat</Link>
                ) : (
                  <IndexButton file={file} />
                )}
              </>
              {/* )} */}
              <TrashBox file={file} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
