import Link from "next/link";
import { File } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import nile from "@/lib/NileServer";
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

// Forcing to re-evaluate each time. 
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = 'force-no-store'

export const BoardList = async ({
  organizationId
}: {
  organizationId: string;
}) => {

  
  const files = await nile
    .db("file")
    .select("*")
    .where({ tenant_id: organizationId });
  console.log("Number of files reported by board component:" + files.length);

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
              <>
                {file.isIndex ? (
                  <Link href={`${file.tenant_id}/chat/${file.id}`}>Chat</Link>
                ) : (
                  <IndexButton file={file} />
                )}
              </>
              {/* Not implemented yet...
              <TrashBox file={file} />
               */}
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
