'use server'
// ^^^ This has to run on the server because it uses database operations and updates the cache

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers';
import nile from '@/lib/NileServer';
import { configureNile } from '@/lib/AuthUtils';

// We to configure Nile in each async function because
// the SDK doesn't support references to pre-configured instances
// TODO: replace with Nile instances when the SDK supports this

export async function addTodo(tenantId: string, prevState: any, formData: FormData) {
    console.log("got tenant id:" + tenantId)
    const title = formData.get('todo')
    configureNile(cookies().get('authData'), tenantId);
    console.log("adding Todo " + title + " for tenant:" + nile.tenantId + " for user:" + nile.userId);
    try {
        // need to set tenant ID because it is a required field
        await nile.db("todos").insert({tenant_id: nile.tenantId, title: title, complete: false})
        revalidatePath('/tenants/${tenantID}/todos')
    } catch (e) {
        console.error(e)
        return { message: 'Failed to add todo' }
    }
  }

export async function completeTodo( tenantId: string, title:string, complete: boolean) {
        configureNile(cookies().get('authData'), tenantId);
        console.log("updating Todo " + title + " for tenant:" + nile.tenantId + " for user:" + nile.userId);
    try {
        // Tenant ID and user ID are in the context, so we don't need to specify them as query filters
        await nile.db("todos").update({complete: complete}).where({title: title})
        revalidatePath('/tenants/${tenantID}/todos')
    } catch (e) {
        console.error(e)
    }
}