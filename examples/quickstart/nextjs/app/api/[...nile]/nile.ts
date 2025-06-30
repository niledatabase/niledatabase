import { Nile } from "@niledatabase/server";
import { nextJs } from "@niledatabase/nextjs";

const nile = await Nile({
  debug: true,
  extensions: [nextJs],
});

export { nile };
