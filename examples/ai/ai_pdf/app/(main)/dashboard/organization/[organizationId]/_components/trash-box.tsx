"use client";
import { useParams, useRouter } from "next/navigation";
import { Search, Trash, Undo } from "lucide-react";

import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import axios from "axios";
// import { File } from "@prisma/client";
import { useState } from "react";

export const TrashBox = ({ file }: { file: any }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const onRemove = async (file: File) => {
    setLoading(true);
    console.log("DELETE");
    await axios.post("/api/deleteindex", { data: { file } });
    await axios.post("/api/deletefile", { data: { file } });
    setLoading(false);
    router.refresh();
  };

  if (file === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }
  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4">
        <Spinner size="lg" />
        <h1 className="text-xs">Deleting Index</h1>
      </div>
    );
  }
  return (
    <>
      <ConfirmModal onConfirm={() => onRemove(file)}>
        <div
          role="button"
          className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
        >
          <Trash className="h-4 w-4 text-muted-foreground" />
        </div>
      </ConfirmModal>
    </>
  );
};
