import Server from '@niledatabase/server';


// Initialize the Nile server object for reuse in all pages
// Note that the Nile server configuration points to Nile APIs as the base path

  export const getNile = () => {
    //@ts-ignore
    if (!global.nile) {
    // save Nile instance in global object for reuse
    //@ts-ignore
      global.nile = Server({
        workspace: String(process.env.NEXT_PUBLIC_WORKSPACE),
        database: String(process.env.NEXT_PUBLIC_DATABASE),
        api: {
          basePath: String(process.env.NEXT_PUBLIC_NILE_API),
        },
        db: {
          connection: {
            host: process.env.NILE_DB_HOST,
            user: process.env.NILE_USER,
            password: process.env.NILE_PASSWORD,
          },
        },
      });
    }
        //@ts-ignore
    return global.nile;
}