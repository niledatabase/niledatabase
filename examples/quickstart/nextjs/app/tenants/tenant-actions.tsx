'use server'
// ^^^ This has to run on the server because it uses database operations and updates the cache

import { revalidatePath } from 'next/cache'

import { configureNile} from "@/lib/AuthUtils";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'
import nile from '@/lib/NileServer';

export async function createTenant(prevState: any, formData: FormData) {
    configureNile(cookies().get('authData'), null); // we don't have a tenant yet
    const tenantName = formData.get('tenantname')?.toString();
    if (!tenantName) {
        return { message: 'No tenant name provided' }
    };

    console.log("creating tenant " + tenantName + " for user:" + nile.userId);

    let success = false; // needed because redirect can't be used in try-catch block
    let tenantID = null;
    try {

      const createTenantResponse = await nile.api.tenants.createTenant({
        name: tenantName,
      });
      const tenant = await createTenantResponse.json();
      tenantID = tenant.id;
      console.log('created tenant with tenantID: ', tenantID);
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