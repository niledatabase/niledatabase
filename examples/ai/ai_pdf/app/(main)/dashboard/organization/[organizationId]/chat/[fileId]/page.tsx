import { configureNile } from '@/lib/NileServer';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Chat } from './_components/chat';

interface FileIdPageProps {
  params: Promise<{
    organizationId: string;
    fileId: string;
  }>;
}

const FileIdPage = async ({ params }: FileIdPageProps) => {
  const resolvedParams = await params;
  const { nile: tenantNile, userId } = await configureNile(
    resolvedParams.organizationId,
  );
  console.log(userId);
  if (!userId) {
    redirect('/');
  }
  const number = resolvedParams.organizationId;

  const messages = await tenantNile.db.query(
    `select * from message where "fileId" = $1`,
    [resolvedParams.fileId],
  );

  const fileInfo = await tenantNile.db.query(
    `select * from file where id = $1`,
    [resolvedParams.fileId],
  );

  console.log(fileInfo);
  return (
    <>
      <div className="max-h-[88vh] overflow-hidden">
        <Chat
          fileId={resolvedParams.fileId}
          pastMessages={messages.rows}
          userId={userId}
          tenant_id={number}
          url={fileInfo.rows[0].url}
        />
      </div>
    </>
  );
};

export default FileIdPage;
