'use server'
// ^^^ This has to run on the server because it uses database operations and updates the cache

import { revalidatePath } from 'next/cache'
import { getNile } from '@/lib/NileServer';

const nile = getNile();
export async function addTodo(prevState: any, formData: FormData) {
    const title = formData.get('todo')
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

export async function completeTodo( title:string, complete: boolean) {
    console.log("updating Todo " + title + " to complete:" + complete + " for tenant:" + nile.tenantId + " for user:" + nile.userId);
    try {
        // no need for tenant ID in the where clause since it is part of the context
        await nile.db("todos").update({complete: complete}).where({title: title})
        revalidatePath('/tenants/${tenantID}/todos')
    } catch (e) {
        console.error(e)
    }
}