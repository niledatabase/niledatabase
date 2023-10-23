import serverContext from 'server-only-context';
import Server from '@niledatabase/server';

// default to server with no configuration
export const [getNile, setNile] = serverContext(Server({
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
  }));
