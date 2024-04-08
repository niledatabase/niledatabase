import Server from "@niledatabase/server";

const nile = await Server();

export const { api, db } = nile;
export default nile;
