import { configureNile } from '@/lib/NileServer';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Chat } from "./_components/chat";

interface FileIdPageProps {
  params: {
    organizationId: string;
    fileId: string;
  };
}

const FileIdPage = async ({ params }: FileIdPageProps) => {
  const tenantNile = configureNile(cookies().get("authData"), params.organizationId);
  console.log(tenantNile.userId);
  if (!tenantNile.userId) {
    redirect("/");
  }
  const number = await params.organizationId;
  console.log(number);
  const messages = await tenantNile
    .db("message")
    .where({
      fileId: params.fileId,
    })
    .select();

  const fileInfo = await tenantNile
    .db("file")
    .where({
      id: params.fileId,
    })
    .returning("*");
  console.log(fileInfo);
  return (
    <>
      <div className="max-h-[88vh] overflow-hidden">
        <Chat
          fileId={params.fileId}
          pastMessages={messages}
          userId={tenantNile.userId}
          tenant_id={number}
          url={fileInfo[0].url}
        />
      </div>
    </>
  );
};

export default FileIdPage;
