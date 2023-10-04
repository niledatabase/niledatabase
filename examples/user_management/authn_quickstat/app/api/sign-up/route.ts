import { api } from '@/nile/Server';

export async function POST(req: Request) {

  const res = await api.auth.signUp(req);

  if (res && res.status >= 200 && res.status < 300) {
      const body =  await res.json();
      return new Response(JSON.stringify(body), { status: 201 });
    } else  {
      const body = await res.text();
      return new Response(body, { status: res.status });
  }
} 
