'use server'
// ^^^ This has to run on the server because it uses database operations and updates the cache

import { revalidatePath } from 'next/cache'
import Server from '@theniledev/server'

import { getUserToken } from "@/utils/AuthUtils";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

const nile = Server({
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


export async function createTenant(prevState: any, formData: FormData) {
    console.log ( formData);
    const tenantName = formData.get('tenantname')?.toString();
    if (!tenantName) {
        return { message: 'No tenant name provided' }
    };

    const userToken = getUserToken(cookies().get('authData'));
    nile.token = userToken;

    let success = false; // needed because redirect can't be used in try-catch block
    let tenantID = null;
    try {

      const createTenantResponse = await nile.api.tenants.createTenant({
        name: tenantName,
      });
      const tenant = await createTenantResponse.json();
      tenantID = tenant.id;
      console.log('tenantID', tenantID);
      revalidatePath('/tenants')
      success = true;
    } catch (e) {
        console.error(e)
        return { message: 'Failed to create tenant' }
    }
    if (success && tenantID) {
        redirect(`/tenants/${tenantID}/todos`) // Navigate to new route
    }
  }