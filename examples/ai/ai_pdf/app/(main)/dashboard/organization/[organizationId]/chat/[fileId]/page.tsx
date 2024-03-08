import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { currentTenantId } from "@/lib/tenent-id";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Chat } from "./_components/chat";

interface FileIdPageProps {
  params: {
    fileId: string;
  };
}

const FileIdPage = async ({ params }: FileIdPageProps) => {
  configureNile(cookies().get("authData"), null);
  console.log(nile.userId);
  if (!nile.userId) {
    redirect("/");
  }
  const number = await currentTenantId();
  console.log(number);
  const messages = await nile
    .db("message")
    .where({
      fileId: params.fileId,
      user_id: nile.userId,
      tenant_id: number,
    })
    .select();

  const fileInfo = await nile
    .db("file")
    .where({
      id: params.fileId,
      // user_id: nile.userId,
      tenant_id: number,
    })
    .returning("*");
  console.log(fileInfo);
  return (
    <>
      <div className="max-h-[88vh] overflow-hidden">
        <Chat
          fileId={params.fileId}
          pastMessages={messages}
          userId={nile.userId}
          tenant_id={number}
          url={fileInfo[0].url}
        />
      </div>
    </>
  );
};

export default FileIdPage;
