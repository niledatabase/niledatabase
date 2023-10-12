import { JwtPayload } from "jwt-decode";

export default interface AuthCookieData {
    accessToken: string | undefined;
    state: string | null;
    event: string | null;
    error: string | null;
    tenantId: string | null;
    tokenData: JwtPayload & NileJWTPayload | null;
  }
  
  export interface NileJWTPayload extends JwtPayload {
    name: string | null;
    given_name: string | null;
    family_name: string | null;
    email: string | null;
    picture: string | null;
  }

  export function toCookieData(formData: FormData, decodedJWT: NileJWTPayload): AuthCookieData {
    return {
      accessToken: String(formData.get('access_token')),
      state: String(formData.get('state')),
      event: String(formData.get('event')),
      error: String(formData.get('error')),
      tenantId: String(formData.get('tenantId')),
      tokenData: decodedJWT,
    };
  }