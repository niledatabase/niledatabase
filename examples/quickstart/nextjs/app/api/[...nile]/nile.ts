import NileServer from "@niledatabase/server";
const _nile = await NileServer({ debug: true });

export const { handlers } = _nile.api;
export const nile = _nile;
