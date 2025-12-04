"use client";
import { Cloud, File, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { SubscriptionButton } from "@/app/(main)/dashboard/organization/[organizationId]/settings/_components/subscription_button";
import {
  MAX_FREE_FILES,
  MAX_FREE_PAGES,
  MAX_PRO_PAGES,
  MAX_PRO_MB,
  MAX_FREE_MB,
} from "@/constants/limits";
import { useUploadThing } from "@/lib/uploadthing";
import Dropzone from "react-dropzone";
import { toast } from "sonner";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";

interface UploadButtonProps {
  org_id: string;
  count: number;
  isPro: boolean;
}

const UploadDropzone = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { startUpload } = useUploadThing(
    isSubscribed ? "proPlanUploader" : "freePlanUploader"
  );

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);

        const progressInterval = startSimulatedProgress();

        // handle file uploading
        const res = await startUpload(acceptedFile);
        console.log("Result of startUpload:" + JSON.stringify(res));

        const serverData = String(res?.[0].serverData);
        if (!res || !Array.isArray(res) || res.length === 0) {
          toast.error("Something went wrong: " + JSON.stringify(res));
        } else if (serverData !== "SUCCESS") {
          if (serverData === "LIMIT EXCEEDED") {
            toast.error(
              "You have exceeded the allowed page limit for your subscription plan. The maximum number of pages allowed is " +
                (isSubscribed ? MAX_PRO_PAGES : MAX_FREE_PAGES)
            );
          } else if (serverData === "PARSE FAILED") {
            toast.error(
              "File can't be parsed and text can't be extracted. Please try another."
            );
          } else if (serverData === "EMBEDDING FAILED") {
            toast.error(
              "Failed to create embeddings while uploading file. You can try manually with the Embed File button."
            );
            // in this case, we do have a new file, so we should refresh the page to see it
            router.refresh();
          } else {
            toast.error(
              "File upload failed due to an error: " + res[0].serverData.status
            );
          }
        } else if (!res[0].key) {
          toast.error(
            "Something went wrong. File identifier missing. Please try again"
          );
        } else {
          // if we got all the way here, the upload was successful:
          setUploadProgress(100);
          toast.success("Upload successful!");
          console.log(
            "File uploaded successfully, refreshing page to see files"
          );
          router.refresh();
        }
        // regardless, we should clear the upload state
        clearInterval(progressInterval);
        setIsUploading(false);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"
        >
          <div className="flex items-center justify-center h-full w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-card-muted hover:bg-card-foreground"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Cloud className="h-6 w-6 text-muted-foreground mb-2" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF (up to {isSubscribed ? MAX_PRO_MB : MAX_FREE_MB}MB) and{" "}
                  {isSubscribed ? MAX_PRO_PAGES : MAX_FREE_PAGES} pages
                </p>
              </div>

              {acceptedFiles && acceptedFiles[0] && isUploading ? (
                <div className="max-w-xs bg-muted flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                  <div className="px-3 py-2 h-full grid place-items-center">
                    <File className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="px-3 py-2 h-full text-sm truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="w-full mt-4 max-w-xs mx-auto">
                  <Progress
                    indicatorColor={
                      uploadProgress === 100
                        ? "bg-green-500"
                        : "dark:bg-zinc-200"
                    }
                    value={uploadProgress}
                    className="h-1 w-full dark:bg-zinc-800"
                  />
                  {uploadProgress === 100 ? (
                    <div className="flex gap-1 items-center justify-center text-sm text-green-300 text-center pt-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Done
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

const UploadButton: FC<UploadButtonProps> = ({ org_id, count, isPro }) => {
  return (
    <>
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>
            {isPro ? "You are on Pro Plan" : "You are on Free Plan"}
          </CardTitle>
          <CardDescription>
            {isPro
              ? "To manage subscription go to settings"
              : `You can upload ${MAX_FREE_FILES} files. ${
                  MAX_FREE_FILES - count
                } Remaining`}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <SubscriptionButton isPro={isPro} orgId={org_id} />
        </CardFooter>
      </Card>
      {(isPro || count < MAX_FREE_FILES) && (
        <UploadDropzone isSubscribed={isPro} />
      )}
    </>
  );
};

export default UploadButton;
