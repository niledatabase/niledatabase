import { Nile } from "@niledatabase/server";
import { nextJs } from "@niledatabase/nextjs";

const nile = Nile({
  debug: true,
  extensions: [nextJs],
});

const noContext = nile.noContext;
export { nile, noContext };
