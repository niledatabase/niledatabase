import express from "express";
import { tenantDB, tenantContext, db } from "./db/db";
import {
  tenants as tenantSchema,
  todos as todoSchema,
  users as usersSchema,
  tenant_users,
} from "./db/schema";
import { eq } from "drizzle-orm";
import { match } from "path-to-regexp";
import expressBasicAuth from "express-basic-auth";

const PORT = process.env.PORT || 3001;
const REQUIRE_AUTH = process.env.REQUIRE_AUTH || false;

const app = express();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set the tenant ID in the context based on the URL parameter
app.use((req, res, next) => {
  const fn = match("/api/tenants/:tenantId/todos", {
    decode: decodeURIComponent,
  });
  const m = fn(req.path);

  //@ts-ignore
  const tenantId = m?.params?.tenantId;
  console.log("setting context to tenant: " + tenantId);
  tenantContext.run(tenantId, next);
});

// add basic auth middleware if required
// we are doing this after setting the tenant context, so we'll have an appropriate connection to the DB
app.use(
  expressBasicAuth({
    authorizer: dbAuthorizer,
    authorizeAsync: true,
    unauthorizedResponse: getUnauthorizedResponse,
  })
);

async function dbAuthorizer(
  username: string,
  password: string,
  cb: (err: any, result: boolean) => void
) {
  console.log("authenticating user: " + username);
  if (!REQUIRE_AUTH) {
    return cb(null, true);
  }
  const users: any = await tenantDB(async (tx) => {
    return await tx
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.id, username));
  });

  if (users.length === 0) {
    return cb(null, false);
  }
  return cb(null, true);
}

function getUnauthorizedResponse(req: any) {
  return req.auth
    ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
    : "No credentials provided";
}

// create new tenant
app.post("/api/tenants", async (req, res) => {
  try {
    const name = req.body.name;
    const id = req.body.id;
    var tenants: any = null;
    if (id) {
      tenants = await tenantDB(async (tx) => {
        return await tx.insert(tenantSchema).values({ name, id }).returning();
      });
    } else {
      tenants = await tenantDB(async (tx) => {
        return await tx.insert(tenantSchema).values({ name }).returning();
      });
    }
    console.log("created tenant: " + JSON.stringify(tenants));
    if (REQUIRE_AUTH) {
      // need to connect user to tenant
      // @ts-ignore
      await tenantDB(async (tx) => {
        // @ts-ignore
        return await tx
          .insert(tenant_users)
          .values({ tenant_id: tenants[0].id, user_id: req.auth.user });
      });
    }

    res.json(tenants);
  } catch (error: any) {
    console.log("error creating tenant: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// return list of tenants for current user
app.get("/api/tenants", async (req, res) => {
  let tenants: any = [];
  try {
    if (REQUIRE_AUTH) {
      tenants = await tenantDB(async (tx) => {
        return (
          db
            .select()
            .from(tenantSchema)
            .innerJoin(
              tenant_users,
              eq(tenantSchema.id, tenant_users.tenant_id)
            )
            // @ts-ignore
            .where(eq(tenant_users.user_id, req.auth.user))
        );
      });
    } else {
      tenants = await tenantDB(async (tx) => {
        return await tx.select().from(tenantSchema);
      });
    }
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
      return await tx
        .insert(todoSchema)
        .values({ tenantId, title, complete })
        .returning();
    });
    res.json(newTodo);
  } catch (error: any) {
    console.log("error adding task: " + error.message);
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
      return await tx
        .update(todoSchema)
        .set({ complete })
        .where(eq(todoSchema.id, id));
    });
    res.sendStatus(200);
  } catch (error: any) {
    console.log("error updating tasks: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// get all tasks for tenant
app.get("/api/tenants/:tenantId/todos", async (req, res) => {
  try {
    // No need for a "where" clause here because we are setting the tenant ID in the context
    const todos = await tenantDB(async (tx) => {
      return await tx.select().from(todoSchema);
    });
    res.json(todos);
  } catch (error: any) {
    console.log("error listing tasks: " + error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});

// insecure endpoint to get all todos - don't try this in production 😅
app.get("/insecure/all_todos", async (req, res) => {
  try {
    console.log("getting all todos");
    const todos = await tenantDB(async (tx) => {
      return await tx.select().from(todoSchema);
    });
    console.log("returning all todos: " + JSON.stringify(todos));
    res.json(todos);
  } catch (error: any) {
    console.log("error in insecure endpoint: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
