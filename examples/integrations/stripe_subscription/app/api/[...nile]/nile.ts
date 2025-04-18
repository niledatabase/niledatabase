import { Nile } from "@niledatabase/server";
import { nextJs } from "@niledatabase/nextjs";

export const nile = await Nile({
  debug: true,
  secureCookies: process.env.VERCEL === "1",
  extensions: [nextJs],
});

export const { handlers } = nile;
