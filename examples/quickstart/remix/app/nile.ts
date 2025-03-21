import { Nile } from "@niledatabase/server";

export const nile = await Nile();
export const { handlers } = nile.api;
