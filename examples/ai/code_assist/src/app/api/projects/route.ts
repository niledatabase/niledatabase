import { Nile } from "@niledatabase/server";

type Data = {
  projects: { id: string; name: string }[];
};

export async function POST(req: Request) {
  try {
    const nile = await Nile();
    const body = await req.json();
    nile.tenantId = body.tenant_id;
    console.log("tenant_id:", body.tenant_id);
    const result = await nile.db
      .query(`SELECT p.id, p.name, t.name as tenant_name 
        FROM projects p JOIN tenants t on p.tenant_id=t.id `); // no need to specify tenant_id, as we set the context above

    const projects = result.rows;
    return new Response(JSON.stringify({ projects }), { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new Response(JSON.stringify({ projects: [] }), { status: 500 });
  }
}
