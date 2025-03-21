import { Nile } from "@niledatabase/server";

type Data = {
  files: string[];
};

// TODO: Need to set nile user ID from cookie for security
export async function POST(req: Request) {
  try {
    const nile = await Nile();
    const body = await req.json();
    nile.tenantId = body.tenant_id;
    const project_id = body.project_id;
    const result = await nile.db.query(
      "SELECT file_name FROM file_content where project_id=$1",
      [project_id]
    ); // no need to specify tenant_id, as we set the context above
    const files = result.rows.map(
      (row: { file_name: string }) => row.file_name
    );
    return new Response(JSON.stringify({ files: files }), { status: 200 });
  } catch (error) {
    console.error("Error fetching files:", error);
    return new Response(JSON.stringify({ files: [] }), { status: 500 });
  }
}
