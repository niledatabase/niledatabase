import NileServer from "@niledatabase/server";
const _nile = await NileServer();

export const { handlers } = _nile.api;
export const nile = _nile;
