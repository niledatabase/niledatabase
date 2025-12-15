import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
export const globalControlPlane =
  process.env.GLOBAL_CONTROL_PLANE || 'http://localhost:8080';
export const credKeyPrefix =
  process.env.NODE_ENV === 'production' ? '__Secure-db-creds' : 'db-creds';
export const cookieKey =
  process.env.NODE_ENV === 'production' ? '__Secure-token' : 'token';

export const claimCookie = {
  name:
    process.env.NODE_ENV === 'production'
      ? '__Secure-nile-claim-db'
      : 'nile-claim-db',
  async exists(): Promise<boolean> {
    const cookieStore = await cookies();
    const target = cookieStore.get(this.name)?.value;
    if (!target) {
      return false;
    }
    return true;
  },
  async set(
    value: Record<string, unknown> | string,
    params?: Partial<ResponseCookie>,
  ) {
    const cookieStore = await cookies();
    await cookieStore.set(this.name, encodeBase64Url(value), {
      ...cookieConfig,
      ...params,
    });
  },
  async get() {
    const cookieStore = await cookies();
    const target = cookieStore.get(this.name)?.value;
    if (!target) {
      return;
    }
    const claimCookie = decodeBase64Url(target);
    try {
      return JSON.parse(String(claimCookie));
    } catch {
      return;
    }
  },
};
export const tokenCookie = {
  name: cookieKey,
  async set(value: string, params?: Partial<ResponseCookie>) {
    const cookieStore = await cookies();
    await cookieStore.set(this.name, encodeBase64Url(value), {
      ...cookieConfig,
      ...params,
    });
  },
  async get() {
    const cookieStore = await cookies();
    const target = cookieStore.get(this.name)?.value;
    if (target) {
      return target;
    }
  },
};
export const cookieConfig: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 86400, // 24h
  path: '/',
};
function encodeBase64Url(obj: unknown): string {
  const b64 = Buffer.from(JSON.stringify(obj), 'utf8').toString('base64');
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
function decodeBase64Url(b64url: void | string): string {
  if (!b64url) {
    return '';
  }
  let base64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4;
  if (pad) base64 += '='.repeat(4 - pad);
  return Buffer.from(base64, 'base64').toString('utf8');
}
