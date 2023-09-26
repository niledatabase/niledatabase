import { JwtPayload } from "jwt-decode";

export default interface AuthCookieData {
  accessToken: string | null;
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
