import { Nile } from "@niledatabase/server";

type Data = {
  content: string | null;
};

// TODO: Need to set nile user ID from cookie for security
export async function POST(req: Request) {
  const nile = await Nile();
  const body = await req.json();
  const fileName = body.file_name;

  try {
    nile.tenantId = body.tenant_id;
    const project_id = body.project_id;
    const result = await nile.db.query(
      "SELECT contents FROM file_content WHERE project_id=$1 and file_name like $2",
      [project_id, "%" + fileName]
    ); // guaranteed to belong to current tenant
    console.log("file name:", fileName);
    const content = result.rows[0]?.contents || null;
    return new Response(JSON.stringify({ content }), { status: 200 });
  } catch (error) {
    console.error("Error fetching file content:", error);
    return new Response(JSON.stringify({ content: null }), { status: 500 });
  }
}
