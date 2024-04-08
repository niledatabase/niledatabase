import Nile from "@niledatabase/server";

// @ts-ignore // Nile requires a bit more configuration, but this example doesn't use those
// Note that the Nile server configuration points to Nile APIs as the base path
export const { api } = await Nile();
