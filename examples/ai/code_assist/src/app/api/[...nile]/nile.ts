import { Nile } from "@niledatabase/server";

export const nile = await Nile({
  api: {
    secureCookies: process.env.VERCEL === "1",
  },
  debug: true,
});

export const { handlersWithContext, handlers } = nile.api;
