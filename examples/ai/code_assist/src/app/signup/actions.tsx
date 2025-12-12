'use server';
import { registerTenants } from '@/lib/TenantRegistration';
import { nile } from '../api/[...nile]/nile';

export async function saveUserToTenants() {
  const me = await nile.users.getSelf();
  if ('id' in me) {
    await registerTenants(me.id);
    return { ok: true };
  }
  return { ok: false };
}
