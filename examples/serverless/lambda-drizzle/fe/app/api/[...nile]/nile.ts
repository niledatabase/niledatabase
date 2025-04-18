import "server-only";
import {Nile} from "@niledatabase/server";
const _nile = await Nile({
  secureCookies: process.env.VERCEL === "1",
  debug: true,
});
export const { handlers } = _nile.api;
export const nile = _nile;
