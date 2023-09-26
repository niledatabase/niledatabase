import { headers } from 'next/headers';

import SingleSignOnSettings from './SingleSignOnSettings';

import { api } from '@/nile/Server';

async function getProviders() {
  const _headers = headers() as Headers;
  const providers = await api.auth.listTenantProviders(_headers);
  return await new Response(providers.body).json();
}

export default async function SSOSettings() {
  const providers = await getProviders();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <SingleSignOnSettings
          providers={providers}
          callbackUrl={api.auth.getSSOCallbackUrl(headers())}
        />
      </div>
    </main>
  );
}
