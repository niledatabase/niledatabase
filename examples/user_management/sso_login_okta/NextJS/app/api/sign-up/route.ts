import nile, { api } from '@/nile/Server';

export async function POST(req: Request) {
  // clone because the SDK will read it, but we need to name the tenant later
  const data = req.clone();
  const payload = await new Response(data.body).json();

  // sign the user up
  const response = await api.auth.signUp(req);

  // basic protection, to expose server errors
  const headers = response.headers;
  const contentType = headers.get('content-type');
  if (contentType?.includes('text/plain')) {
    const body = await new Response(response.body).text();
    return new Response(body, { status: response.status });
  }

  // for this example, create a tenant for the user vs prompting them to create one
  // use the token from sign up to create a tenant
  const body = await new Response(response.body).json();

  const { token } = body;

  // set the token at the top level so it cascades to all properties
  nile.token = token.jwt;

  await api.tenants.createTenant({ name: payload.email });

  return new Response(JSON.stringify(body), { status: 201 });
}
