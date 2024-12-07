import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { tenantDB, tenantContext, db } from "./db/db"
import {
  tenants as tenantSchema,
  todos as todoSchema,
  users as usersSchema,
  tenant_users,
} from "./db/schema"
import {
  findSimilarTasks,
  embedTask,
  EmbeddingTasks,
  aiEstimate,
} from "./AiUtils"
import { eq } from "drizzle-orm"

const PORT = process.env.PORT || 3001
const REQUIRE_AUTH = process.env.REQUIRE_AUTH || false

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


// Middleware to set tenant context
app.use('/api/tenants/:tenantId/*', async (c, next) => {
  const tenantId = c.req.param('tenantId')
  console.log("setting context to tenant: " + tenantId)
  return tenantContext.run(tenantId, () => next())
})

// Basic auth middleware
/*if (REQUIRE_AUTH) {
  console.log("adding basic auth middleware")
  app.use('/api/*', async (c, next) => {
    const auth = basicAuth({
      async username(username, password) {
        if (!REQUIRE_AUTH) return true
        
        const users = await tenantDB(async (tx) => {
          return await tx
            .select()
            .from(usersSchema)
            .where(eq(usersSchema.id, username))
        })
        return users.length > 0
      },
    })
    return auth(c, next)
  })
}*/

// Routes
app.post('/api/tenants', async (c) => {
  try {
    const body = await c.req.json()
    const { name, id } = body
    
    let tenants
    if (id) {
      tenants = await tenantDB(async (tx) => {
        return await tx.insert(tenantSchema).values({ name, id }).returning()
      })
    } else {
      tenants = await tenantDB(async (tx) => {
        return await tx.insert(tenantSchema).values({ name }).returning()
      })
    }

    /*if (REQUIRE_AUTH) {
      const auth = c.get('username') // Hono stores auth username here
      await tenantDB(async (tx) => {
        return await tx
          .insert(tenant_users)
          .values({ tenant_id: tenants[0].id, user_id: auth })
      })
    }*/

    return c.json(tenants)
  } catch (error: any) {
    console.log("error creating tenant: " + error.message)
    return c.json({ message: "Internal Server Error" }, 500)
  }
})

app.get('/api/tenants', async (c) => {
  try {
    let tenants
    /*if (REQUIRE_AUTH) {
      const auth = c.get('username')
      tenants = await tenantDB(async (tx) => {
        return db
          .select()
          .from(tenantSchema)
          .innerJoin(tenant_users, eq(tenantSchema.id, tenant_users.tenant_id))
          .where(eq(tenant_users.user_id, auth))
      })
    } else {*/
      tenants = await tenantDB(async (tx) => {
        return await tx.select().from(tenantSchema)
      })
    // }
    return c.json(tenants)
  } catch (error: any) {
    console.log("error listing tenants: " + error.message)
    return c.json({ message: "Internal Server Error" }, 500)
  }
})

app.post('/api/tenants/:tenantId/todos', async (c) => {
  try {
    const { title, complete } = await c.req.json()
    if (!title) {
      return c.json({ message: "No task title provided" }, 400)
    }
    const tenantId = c.req.param('tenantId')

    let estimate: string | null = null;
    let embedding: number[] | null = null;

    if (process.env.AI_API_KEY) {
      const similarTasks = await findSimilarTasks(tenantDB, title)
      estimate = await aiEstimate(title, similarTasks)
      embedding = await embedTask(title, EmbeddingTasks.SEARCH_DOCUMENT)
    } else {
      estimate = "can't estimate because AI is not configured"
    }

    const newTodo = await tenantDB(async (tx) => {
      return await tx
        .insert(todoSchema)
        .values({ tenantId, title, complete, estimate, embedding })
        .returning()
    })
    
    return c.json(newTodo.map((t: any) => ({ ...t, embedding: "<omitted>" })))
  } catch (error: any) {
    console.log("error adding task: " + error.message)
    return c.json({ message: "Internal Server Error" }, 500)
  }
})

app.put('/api/tenants/:tenantId/todos', async (c) => {
  try {
    const { id, complete } = await c.req.json()
    await tenantDB(async (tx) => {
      return await tx
        .update(todoSchema)
        .set({ complete })
        .where(eq(todoSchema.id, id))
    })
    return c.text('OK', 200)
  } catch (error: any) {
    console.log("error updating tasks: " + error.message)
    return c.json({ message: "Internal Server Error" }, 500)
  }
})

app.get('/api/tenants/:tenantId/todos', async (c) => {
  try {
    const todos = await tenantDB(async (tx) => {
      return await tx
        .select({
          id: todoSchema.id,
          tenant_id: todoSchema.tenantId,
          title: todoSchema.title,
          estimate: todoSchema.estimate,
        })
        .from(todoSchema)
    })
    return c.json(todos)
  } catch (error: any) {
    console.log("error listing tasks: " + error.message)
    return c.json({ message: error.message }, 500)
  }
})

app.get('/insecure/all_todos', async (c) => {
  try {
    console.log("getting all todos")
    const todos = await tenantDB(async (tx) => {
      return await tx
        .select({
          id: todoSchema.id,
          tenant_id: todoSchema.tenantId,
          title: todoSchema.title,
          estimate: todoSchema.estimate,
        })
        .from(todoSchema)
    })
    console.log("returning all todos: " + JSON.stringify(todos))
    return c.json(todos)
  } catch (error: any) {
    console.log("error in insecure endpoint: " + error.message)
    return c.json({ message: "Internal Server Error" }, 500)
  }
})

export default app