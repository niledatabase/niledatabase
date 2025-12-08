import { nanoid } from 'nanoid';
import { SignJWT, jwtVerify, decodeJwt, JWTVerifyResult } from 'jose';
import { JwtPayload } from 'jwt-decode';

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY!;

export function decode(token: void | string) {
  if (token) {
    return decodeJwt(token);
  }
}

type Payload = {
  username: string;
  password: string;
};
export type TokenJWT = JWTVerifyResult & { payload: JwtPayload & Payload };
export type ValidCreds = (JwtPayload & Payload) | undefined;
export async function createIdToken(payload: Payload) {
  const secret = new TextEncoder().encode(getJwtSecretKey());
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyIdToken(
  token: void | string,
): Promise<TokenJWT | void> {
  if (token) {
    const secret = new TextEncoder().encode(getJwtSecretKey());
    const verified = await jwtVerify(token, secret).catch((e) => {
      console.error(e as Error);
    });
    return verified as TokenJWT;
  }
}

export class JWTSecretError extends Error {
  constructor(message: string) {
    super(message);
  }
}
export function getJwtSecretKey(): string {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new JWTSecretError(
      'The environment variable JWT_SECRET_KEY is not set.',
    );
  }

  return JWT_SECRET_KEY;
}
export async function getCreds(creds: string | void): Promise<ValidCreds> {
  const jwt = await verifyIdToken(creds).catch((e) =>
    console.error(e as Error),
  );
  const { payload } = jwt ?? {};
  return payload;
}
