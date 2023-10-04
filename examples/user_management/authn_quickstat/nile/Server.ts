import Server from '@theniledev/server';

export const { api } = new Server({
  workspace: String(process.env.NILE_WORKSPACE),
  database: String(process.env.NILE_DATABASE),
  api: {
    basePath: String(process.env.BASE_PATH),
  },
});
