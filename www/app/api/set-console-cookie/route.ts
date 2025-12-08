import { NextRequest } from 'next/server';
import { randomBytes } from 'crypto';

import { cookies as nextCookies } from 'next/headers';
import { createIdToken, decode } from './jwt';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
const globalControlPlane =
  process.env.GLOBAL_CONTROL_PLANE || 'http://localhost:8080';
const credKeyPrefix =
  process.env.NODE_ENV === 'production' ? '__Secure-db-creds' : 'db-creds';
const cookieKey =
  process.env.NODE_ENV === 'production' ? '__Secure-token' : 'token';
const databasePrefix = 'database';

const headers = new Headers({
  'content-type': 'application/json; charset=utf-8',
});
// this is crazy, but whatever
export async function POST(req: NextRequest) {
  const cookieStore = await nextCookies();
  // you only get 1, provided it hasn't expired?
  const hasCreds = cookieStore
    .getAll()
    .filter(
      (c) =>
        c.name.startsWith('db-creds-') ||
        c.name.startsWith('__Secure-db-creds-'),
    );
  const hasTokenCookie = cookieStore.get(cookieKey);
  // you only get 1
  if (hasCreds.length > 0 && hasTokenCookie?.value) {
    return new Response(null, { status: 204 });
  }
  const { nonce } = await req.json();
  const email = `ste_${nonce}@thenile.test`;
  const password = generatePassword();

  const body = JSON.stringify({ email, password });
  await fetch(`${globalControlPlane}/developers`, {
    method: 'POST',
    body,
    headers,
  });
  // strict origin check
  const signedIn = await fetch(`${globalControlPlane}/developers/login`, {
    method: 'POST',
    body,
    headers,
  });
  if (signedIn.status === 200) {
    const cookieConfig: Partial<ResponseCookie> = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400, // 24h
      path: '/',
    };
    if (process.env.NODE_ENV === 'production') {
      cookieConfig.domain = '.thenile.dev';
      cookieConfig.sameSite = 'none';
    }
    // should do something better here, probably
    const developerToken = await signedIn.text();

    // do we need the developer token for subsequent requests? probably not, but would be good for www -> nad experience (auto-login)
    cookieStore.set(cookieKey, developerToken, cookieConfig);

    headers.set('Authorization', `Bearer ${developerToken}`);
    const workspace = await fetch(`${globalControlPlane}/workspaces`, {
      method: 'POST',
      body: JSON.stringify({ name: nonce }),
      headers,
    });
    const { slug } = await workspace.json();
    const databaseName = `stedb_${nonce}`;
    const database = await fetch(
      `${globalControlPlane}/workspaces/${slug}/databases`,
      {
        method: 'POST',
        body: JSON.stringify({ databaseName, sharded: false }),
        headers,
      },
    );

    const db = await database.json();
    if (database.ok) {
      const creds = await fetch(
        `${globalControlPlane}/workspaces/${slug}/databases/${databaseName}/credentials?internal=true`,
        {
          method: 'POST',
          headers,
        },
      );
      const generated = await creds.json();
      const encoded = await createIdToken({
        username: generated.id,
        password: generated.password,
      });
      cookieStore.set(
        buildCredsKey({ workspaceSlug: slug, databaseName }),
        encoded,
        cookieConfig,
      );
      const jwt = decode(developerToken);
      const database64 = encodeBase64Url({ ...db, sub: jwt?.sub });

      cookieStore.set(databasePrefix, database64, cookieConfig);
      return new Response(null, { status: 201 });
    } else {
      return new Response(db.message, { status: 400 });
    }
  }
  return new Response('login failed, what do I do about this?', {
    status: 400,
  });
}

function buildCredsKey({
  workspaceSlug,
  databaseName,
}: {
  workspaceSlug: string;
  databaseName: string;
}): string {
  return `${credKeyPrefix}-${workspaceSlug}-${databaseName}`;
}

function generatePassword(length = 32): string {
  const alphabet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=[]{}';
  const bytes = randomBytes(length);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}
function encodeBase64Url(obj: unknown): string {
  const b64 = Buffer.from(JSON.stringify(obj), 'utf8').toString('base64');
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
