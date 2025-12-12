import { nile } from '@/app/api/[...nile]/nile';
import AskIndex from './AskIndex';

async function loadProjects(
  tenantId: string,
): Promise<{ id: string; name: string; tenant_name: string }[]> {
  const nileCtx = await nile.withContext({ tenantId });

  const result = await nileCtx.db
    .query(`SELECT p.id, p.name, t.name as tenant_name 
        FROM projects p JOIN tenants t on p.tenant_id=t.id `); // no need to specify tenant_id, as we set the context above

  return result.rows;
}

async function fileContent(
  tenantId: string,
  projectId: string,
  fileName: string,
): Promise<string> {
  const nileCtx = await nile.withContext({ tenantId });
  const project_id = projectId;
  const result = await nileCtx.db.query(
    'SELECT contents FROM file_content WHERE project_id=$1 and file_name like $2',
    [project_id, '%' + fileName],
  ); // guaranteed to belong to current tenant
  return result.rows[0]?.contents || null;
}

async function loadFiles(tenantId: string, projectId: string) {
  const nileCtx = await nile.withContext({ tenantId });
  const result = await nileCtx.db.query(
    'SELECT file_name FROM file_content where project_id=$1',
    [projectId],
  );
  return result.rows.map((row: { file_name: string }) => row.file_name);
}

export default async function Page({
  params,
}: {
  params: Promise<{ tenantId: string }>;
}) {
  const p = await params;
  const projects = await loadProjects(p.tenantId);
  const file = 'README.md';
  const content = await fileContent(p.tenantId, projects[0].id, 'README.md');
  const loadedFiles = await loadFiles(p.tenantId, projects[0].id);
  return (
    <AskIndex
      projects={projects}
      initialSelectedFiles={[file]}
      initialContent={[content]}
      initialFiles={loadedFiles}
    />
  );
}
