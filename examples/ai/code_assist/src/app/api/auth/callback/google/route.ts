import { NextRequest, NextResponse } from 'next/server';
import { nile as defaultNile } from '../../../[...nile]/nile';
import { registerTenants } from '@/lib/TenantRegistration';

export async function GET(req: NextRequest) {
  const nile = await defaultNile.withContext(req);

  if (nile) {
    const me = await nile.users.getSelf();
    if ('id' in me) {
      await registerTenants(me.id);
    }
  }
  const response = await nile.handlers.withContext.GET(req);
  return response as unknown as NextResponse;
}
