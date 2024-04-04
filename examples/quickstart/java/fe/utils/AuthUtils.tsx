import { JwtPayload } from "jwt-decode";

export default interface AuthCookieData {
  accessToken: string | undefined;
  state: string | null;
  event: string | null;
  error: string | null;
  tenantId: string | null;
  tokenData: (JwtPayload & NileJWTPayload) | null;
}

export interface NileJWTPayload extends JwtPayload {
  name: string | null;
  given_name: string | null;
  family_name: string | null;
  email: string | null;
  picture: string | null;
}

export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean; // Use HTTPS in production
  maxAge: number;
  path: string;
}

export function cookieOptions(maxAge: number): CookieOptions {
  return {
    httpOnly: false,
    secure: process.env.NODE_ENV !== "development", // Use HTTPS in production
    maxAge: maxAge,
    path: "/",
  };
}

export function toCookieData(
  formData: FormData,
  decodedJWT: NileJWTPayload
): AuthCookieData {
  return {
    accessToken: String(formData.get("access_token")),
    state: String(formData.get("state")),
    event: String(formData.get("event")),
    error: String(formData.get("error")),
    tenantId: String(formData.get("tenantId")),
    tokenData: decodedJWT,
  };
}

export function getUserId(rawAuthCookie: any): string | undefined {
  try {
    const authData = JSON.parse(rawAuthCookie.value) as AuthCookieData;
    return authData.tokenData?.sub;
  } catch (e) {
    return undefined;
  }
}

export function getUserToken(rawAuthCookie: any): string | undefined {
  try {
    const authData = JSON.parse(rawAuthCookie.value) as AuthCookieData;
    return authData.accessToken;
  } catch (e) {
    return undefined;
  }
}

export function getUserName(rawAuthCookie: any): string | null | undefined {
  try {
    const authData = JSON.parse(rawAuthCookie.value) as AuthCookieData;
    const bestName =
      authData.tokenData?.name ||
      authData.tokenData?.email ||
      authData.tokenData?.given_name ||
      authData.tokenData?.family_name;
    return bestName;
  } catch (e) {
    return undefined;
  }
}
