import { Nile } from "@niledatabase/server";

export const nile = await Nile({
  secureCookies: process.env.VERCEL === "1",
  debug: true,
});

export const { handlers } = nile.api;
