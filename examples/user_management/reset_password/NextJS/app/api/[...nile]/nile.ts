import "server-only";
import { Nile } from "@niledatabase/server";
export const nile = await Nile({
  debug: true,
  api: {
    secureCookies: process.env.VERCEL === "1",
  },
});

export const { handlers } = nile.api;
