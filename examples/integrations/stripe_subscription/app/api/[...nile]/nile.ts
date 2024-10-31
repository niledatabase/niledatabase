import NileServer from "@niledatabase/server";
const _nile = await NileServer({ secureCookies: process.env.VERCEL === "1" });

export const { handlers } = _nile.api;
export const nile = _nile;
