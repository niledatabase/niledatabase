"use client";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import { File } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { set } from "react-hook-form";
import { toast } from "sonner";

// interface IndexButtonProps {
//   file: File;
// }

const IndexButton = ({ file }: { file: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async () => {
    try {
      //   const url = file.url;
      setLoading(true);
      const response = await axios.post("/api/index", { file });
      // console.log(response);
      router.refresh();
      toast.success("Successfully Index");
      //   toast({
      //     title: "Successfully Index",
      //     description: "File successfully indexed",
      //   });
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          return toast.error("Out of credits");
        }
      } else {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <>
      {file.isIndex ? (
        <h1>File successfully indexed</h1>
      ) : (
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "Indexing..." : "Embed File"}
        </Button>
      )}
    </>
  );
};

export default IndexButton;
