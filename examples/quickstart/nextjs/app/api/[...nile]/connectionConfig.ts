import 'server-only';
import { createRequire } from 'node:module';

import type { Nile } from '@niledatabase/server';

const requireSdk = createRequire(import.meta.url);

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required for Vercel OIDC`);
  return value;
}

export function connectionConfig(): Parameters<typeof Nile>[0] {
  const mode = process.env.NILEDB_AUTH_MODE ?? 'password';
  if (mode === 'password') return {};
  if (mode !== 'vercel-oidc') {
    throw new Error('NILEDB_AUTH_MODE must be password or vercel-oidc');
  }

  // Keep password mode compatible with existing SDK releases. OIDC mode requires
  // a separately published OAUTHBEARER-capable release; it never uses a password
  // when that release or its optional provider dependency is missing.
  let createVercelConfig;
  let OAuthBearerClient;
  try {
    ({ createVercelConfig, OAuthBearerClient } = requireSdk(
      '@niledatabase/server/vercel',
    ));
  } catch (error) {
    if (
      error instanceof Error &&
      'code' in error &&
      (error.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED' ||
        error.code === 'MODULE_NOT_FOUND')
    ) {
      throw new Error(
        'Vercel OIDC requires a published @niledatabase/server release with the OAUTHBEARER client, /vercel helper, and @vercel/oidc. Update the SDK and lockfile before selecting this mode.',
      );
    }
    throw error;
  }
  if (
    typeof createVercelConfig !== 'function' ||
    typeof OAuthBearerClient !== 'function'
  ) {
    throw new Error(
      'The installed Nile SDK does not expose the OAUTHBEARER Vercel client and helper',
    );
  }

  const config = createVercelConfig({
    loginId: requiredEnv('NILEDB_OIDC_LOGIN_ID'),
    databaseId: requiredEnv('NILEDB_ID'),
    databaseName: requiredEnv('NILEDB_NAME'),
    vercelResourceId: requiredEnv('NILEDB_VERCEL_RESOURCE_ID'),
    host: requiredEnv('NILEDB_HOST'),
    port: Number(process.env.NILEDB_PORT ?? 5432),
    apiUrl: requiredEnv('NILEDB_API_URL'),
  });
  if (
    typeof config.oauthBearerToken !== 'function' ||
    config.db?.oauthBearerToken !== config.oauthBearerToken ||
    config.db?.Client !== OAuthBearerClient ||
    config.password !== undefined ||
    config.db?.password !== undefined
  ) {
    throw new Error('The installed Vercel helper must use OAUTHBEARER');
  }
  return config;
}
