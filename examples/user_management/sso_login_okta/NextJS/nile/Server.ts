import Server from '@theniledev/server';

const nile = Server({
  workspace: String(process.env.NEXT_PUBLIC_WORKSPACE),
  database: String(process.env.NEXT_PUBLIC_DATABASE),
  api: {
    basePath: String(process.env.NEXT_PUBLIC_NILE_API),
  },
});

export const { api, db } = nile;
export default nile;
