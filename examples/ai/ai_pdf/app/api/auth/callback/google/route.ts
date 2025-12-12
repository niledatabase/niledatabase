import { nile } from '@/lib/NileServer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const postHandled = await nile.handlers.GET(req);

  if (postHandled instanceof Response) {
    const setCookie = postHandled.headers.getSetCookie();
    const hasSession = setCookie.filter((c: string) =>
      c.includes('nile.session-token'),
    );
    if (hasSession) {
      const tenants = await nile.tenants.list();
      if (Array.isArray(tenants)) {
        if (!tenants.find((t) => t.name === 'workspace')) {
          await nile.tenants.create({ name: 'workspace' });
        }
      }
      return NextResponse.redirect(new URL('/dashboard', req.url)); // Redirect on successful session
    }
  }
  // Fallback if no session or postHandled is not valid, redirect to login
  return NextResponse.redirect(new URL('/login', req.url));
}
