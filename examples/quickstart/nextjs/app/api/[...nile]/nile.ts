import { Nile } from "@niledatabase/server";

export const nile = await Nile({
<<<<<<< HEAD
  //  debug: true,
=======
  secureCookies: process.env.VERCEL === "1",
  debug: true,
>>>>>>> b092584f (fix(examples): restore secure cookies on vercel)
});

export const { handlers } = nile.api;
