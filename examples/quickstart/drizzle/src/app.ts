import express from "express";
import {db, tenantDB, tenantContext} from './db/db';
import { tenants as tenantSchema, todos as todoSchema } from './db/schema';
import { eq } from "drizzle-orm";
import { pathToRegexp, match } from "path-to-regexp";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// set the tenant ID in the context based on the URL parameter
app.use((req, res, next) => {
  const fn = match("/api/tenants/:tenantId/todos", { decode: decodeURIComponent });
  const m = fn(req.path);

  //@ts-ignore
  const tenantId = m?.params?.tenantId;
  console.log('setting context to tenant: ' + tenantId)
  tenantContext.run(tenantId, next);
})


/*app.param('tenantId', (req, res, next, tenantId) => {
  tenantContext.run(tenantId, next);
});*/

// endpoint to create new tenants
app.post("/api/tenants", async (req, res) => {
  try {
    const name = req.body.name;
    const id = req.body.id;
    var tenant = null;
    if (id) {
      tenant = await tenantDB(async (tx) => {
        return await tx.insert(tenantSchema).values({name, id}).returning();
      });
    } else {
      tenant = await tenantDB(async (tx) => {
        return await tx.insert(tenantSchema).values({name}).returning();
      });
    }
    res.json(tenant);
  } catch (error: any) {
    console.log("error creating tenant: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// return list of tenants for current user
app.get("/api/tenants", async (req, res) => {
  let tenants:any = [];
  try {
      tenants = await tenantDB(async (tx) => {
        return await tx.select().from(tenantSchema);
      })
      res.json(tenants);
  } catch (error: any) {
    console.log("error listing tenants: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// add new task for tenant
app.post("/api/tenants/:tenantId/todos", async (req, res) => {
  try {
    const { title, complete } = req.body;
    const tenantId = req.params.tenantId;
    const newTodo = await tenantDB(async (tx) => {
      return await tx.insert(todoSchema).values({tenantId, title, complete}).returning();
    })
    res.json(newTodo);
  } catch (error: any) {
    console.log("error adding task: "+ error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// update tasks for tenant - note that we don't handle partial updates here
// No need for where clause because we have the tenant in the context
app.put("/api/tenants/:tenantId/todos", async (req, res) => {  
  try {
    const { id, complete } = req.body;
    await tenantDB(async (tx) => {
      return await tx.update(todoSchema).set({complete}).where(eq(todoSchema.id, id));
    })
    res.sendStatus(200);
  } catch(error: any) {
    console.log("error updating tasks: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// get all tasks for tenant
app.get("/api/tenants/:tenantId/todos", async (req, res) => {
  try {
    const tenantId = req.params.tenantId;
    // No need for a "where" clause here because we are setting the tenant ID in the context
    const todos = await tenantDB(async (tx) => {
      return await tx.select().from(todoSchema);
    })
    res.json(todos);
  } catch (error: any) {
    console.log( "error listing tasks: " + error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});

// insecure endpoint to get all todos - don't try this in production 😅
app.get("/insecure/all_todos", async (req, res) => {
  try {
    const todos = await tenantDB(async (tx) => {
      return await tx.select().from(todoSchema);
    });
    res.json(todos);
  } catch (error: any) {
    console.log("error in insecure endpoint: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});