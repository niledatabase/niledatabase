import Server from "@niledatabase/server";

// @ts-ignore // Nile requires a bit more configuration, but this example doesn't use those
// Note that the Nile server configuration points to Nile APIs as the base path
export const { api } = new Server({
  workspace: String(process.env.NEXT_PUBLIC_WORKSPACE),
  database: String(process.env.NEXT_PUBLIC_DATABASE),
  api: {
    basePath: String(process.env.NEXT_PUBLIC_NILE_API),
  },
});
