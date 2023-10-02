'use server'
// ^^^ This has to run on the server because it uses database operations and updates the cache

import { revalidatePath } from 'next/cache'
import Server from '@theniledev/server'
import { getUserId } from "@/utils/AuthUtils";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

const { api, db } = Server({
    workspace: String(process.env.NEXT_PUBLIC_WORKSPACE),
    database: String(process.env.NEXT_PUBLIC_DATABASE),
    api: {
      basePath: String(process.env.NEXT_PUBLIC_BASE_PATH),
    },
    db: {
      connection: {
        host: process.env.NILE_DB_HOST,
        user: process.env.NILE_USER,
        password: process.env.NILE_PASSWORD,
      },
    },
  });


export async function addTodo(tenantid: string, prevState: any, formData: FormData) {
    console.log ( formData);
    console.log ( tenantid);
    const title = formData.get('todo')
    const userId = getUserId(cookies().get('authData'))
    try {
        await db.raw(`
        set nile.tenant_id = '${tenantid}'; 
        set nile.user_id = '${userId}';
        insert into todos (tenant_id, title, complete) values ('${tenantid}','${title}',false);`) 
      revalidatePath('/tenants/${tenantID}/todos')
    } catch (e) {
        console.error(e)
        return { message: 'Failed to add todo' }
    }
  }

export async function completeTodo(tenantid: string, title:string, complete: boolean) {
    //const tenantid = formData.get('tenantid')
    //const title = formData.get('title')
    console.log("completeTodo");
    console.log ( tenantid);
    console.log ( title);
    console.log ( complete);
    const userId = getUserId(cookies().get('authData'))
    try {
        await db.raw(`
        set nile.tenant_id = '${tenantid}'; 
        set nile.user_id = '${userId}';
        update todos set complete='${complete}' where title='${title}';`) 
      revalidatePath('/tenants/${tenantID}/todos')
    } catch (e) {
        console.error(e)
        //return { message: 'Failed to add todo' }
    }
}