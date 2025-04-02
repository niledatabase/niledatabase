import { configureNile } from "@/lib/NileServer";
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
  const tenantNile = await configureNile(params.organizationId);
  console.log(tenantNile.userId);
  if (!tenantNile.userId) {
    redirect("/");
  }
  const number = await params.organizationId;
  console.log(number);
  const messages = await tenantNile.db.query(
    `select * from message where "fileId" = $1`,
    [params.fileId]
  );

  const fileInfo = await tenantNile.db.query(
    `select * from file where id = $1`,
    [params.fileId]
  );

  console.log(fileInfo);
  return (
    <>
      <div className="max-h-[88vh] overflow-hidden">
        <Chat
          fileId={params.fileId}
          pastMessages={messages.rows}
          userId={tenantNile.userId}
          tenant_id={number}
          url={fileInfo.rows[0].url}
        />
      </div>
    </>
  );
};

export default FileIdPage;
