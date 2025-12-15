'use server';

import { randomUUID } from 'crypto';
import { claimCookie, globalControlPlane, tokenCookie } from './utils';

export async function prepareClaim() {
  const claim = await claimCookie.get();
  const inviteResponse = await fetch(
    `${globalControlPlane}/workspaces/${claim.workspace.slug}/invites`,
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        authorization: `bearer ${await tokenCookie.get()}`,
      },
      method: 'POST',
      body: JSON.stringify({
        // this kind of email is a placeholder, so does not matter
        email: `ste_${randomUUID()}@thenile.dev`,
        programmatic: true,
      }),
    },
  );
  const rawData = await inviteResponse.json();
  return { ok: true, data: { code: rawData.code } };
}
