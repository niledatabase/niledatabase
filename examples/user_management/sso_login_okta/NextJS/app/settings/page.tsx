import { headers } from 'next/headers';

import SingleSignOnSettings from './SingleSignOnSettings';

import { api } from '@/nile/Server';

async function getProviders() {
  const _headers = headers() as Headers;
  const response = await api.auth.listTenantProviders(_headers);
  // handle error cases:
  if (response.status >= 400) {
    console.log('got error response from nile')
    const body = await new Response(response.body).text();
    console.log(`Sign-up error returned from Nile: ${response.status} ${body}`);
    return new Response(body, { status: response.status });
  }
  return await new Response(response .body).json();
}

export default async function SSOSettings() {
  const providers = await getProviders();
  return (
      <div>
        <SingleSignOnSettings
          providers={providers}
          callbackUrl={api.auth.getSSOCallbackUrl(headers())}
        />
      </div>
  );
}
