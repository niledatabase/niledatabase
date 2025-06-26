import express from "express";
import { match } from "path-to-regexp";
import { Prisma, PrismaClient } from "@prisma/client";
import expressBasicAuth from "express-basic-auth";
import { v4 as uuidv4, parse } from "uuid";
import { tenantContext } from "./storage";
import { dbAuthorizer, getUnauthorizedResponse } from "./basicauth";
import type { tenants } from "@prisma/client";
import {
  findSimilarTasks,
  aiEstimate,
  embedTask,
  EmbeddingTasks,
  embeddingToSQL,
} from "./AiUtils.js";

const PORT = process.env.PORT || 3001;
const REQUIRE_AUTH = process.env.REQUIRE_AUTH || false;

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
const app = express();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Creates a Prisma Client Extension which sets Nile tenant context
 *
 * Queries are wrapped in a transaction, because PostgreSQL connection pool
 * may give different connections for the same session. Transactions overcome
 * this problem.
 *
 * @param tenantId string
 * @returns Prisma Client Extension with tenant context
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions
 */
//@ts-ignore
function tenantDbExtension(
  tenantId: string | null | undefined
): (client: any) => PrismaClient<any, any, any, Types.Extensions.Args> {
  return Prisma.defineExtension((prisma) =>
    // @ts-ignore (Excessive stack depth comparing types...)
    prisma.$extends({
      query: {
        $allModels: {
          async $allOperations({ args, query }) {
            // set tenant context, if tenantId is provided
            // otherwise, reset it
            const [, result] = tenantId
              ? await prisma.$transaction([
                  prisma.$executeRawUnsafe(
                    `SET nile.tenant_id = '${tenantId}';`
                  ),
                  query(args),
                ])
              : await prisma.$transaction([
                  prisma.$executeRawUnsafe(`RESET nile.tenant_id;`),
                  query(args),
                ]);
            return result;
          },
        },
      },
    })
  );
}

// Express middleware that sets gets a Prisma Client Extension with tenant context
// and sets it in the AsyncLocalStorage context
app.use((req, res, next) => {
  const fn = match("/api/tenants/:tenantId/todos", {
    decode: decodeURIComponent,
  });
  const m = fn(req.path);

  //@ts-ignore
  const tenantId = m?.params?.tenantId;
  console.log(
    "Creating async storage with extended prisma client for: " + tenantId
  );
  //@ts-ignore
  tenantContext.run(
    prisma.$extends(tenantDbExtension(tenantId)) as any as PrismaClient,
    next
  );
});

// add basic auth middleware if required
// we are doing this after setting the tenant context, so we'll have an appropriate connection to the DB
if (REQUIRE_AUTH) {
  app.use(
    expressBasicAuth({
      authorizer: dbAuthorizer,
      authorizeAsync: true,
      unauthorizedResponse: getUnauthorizedResponse,
    })
  );
}

// endpoint to create new tenants
app.post("/api/tenants", async (req, res) => {
  try {
    const tenantDB = tenantContext.getStore();
    const name = req.body.name;
    const id = req.body.id;
    var tenant: tenants | null = null;
    if (id) {
      tenant = await prisma.tenants.create({
        data: { id: id, name: name },
      });
    } else {
      tenant = await prisma.tenants.create({
        data: { name: name },
      });
    }

    if (REQUIRE_AUTH) {
      // need to connect user to tenant
      const tenant_id = tenant.id;
      await tenantDB?.tenant_users.create({
        //@ts-ignore
        data: { tenant_id: tenant_id, user_id: req.auth.user },
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
  let tenants: any;
  try {
    const tenantDB = tenantContext.getStore();
    if (REQUIRE_AUTH) {
      tenants = await tenantDB?.tenants.findMany({
        where: {
          tenant_users: {
            some: {
              //@ts-ignore
              user_id: req.auth.user,
            },
          },
        },
      });
    } else {
      tenants = await tenantDB?.tenants.findMany();
    }

    res.json(tenants);
  } catch (error: any) {
    console.log("error listing tenants: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// add new task for tenant, with AI-based estimate
app.post("/api/tenants/:tenantId/todos", async (req, res) => {
  try {
    const tenantDB = tenantContext.getStore();
    if (!tenantDB) {
      throw new Error("No tenant DB found");
    }

    const { title, complete } = req.body;
    const tenantId = req.params.tenantId;
    // Only estimate if AI_API_KEY is set
    let estimate = null;
    let embedding= null;
    if (process.env.AI_API_KEY) {
      // We are using tenantDB with tenant context to ensure that we only find tasks for the current tenant
      const similarTasks = await findSimilarTasks(tenantDB, title);
      console.log("found similar tasks: " + JSON.stringify(similarTasks));

      estimate = await aiEstimate(title, similarTasks);
      console.log("estimated time: " + estimate);

      // get the embedding for the task, so we can find it in future similarity searches
      embedding = await embedTask(title, EmbeddingTasks.SEARCH_DOCUMENT);
    }
    console.log("tenant_id: " + tenantId);
    // This is safe because Nile validates the tenant ID and protects against SQL injection
    const newTodo = await tenantDB.$queryRawUnsafe(
      `INSERT INTO todos (tenant_id, title, complete, estimate, embedding) VALUES ('${tenantId}', $1, $2, $3, $4::vector) 
      RETURNING id, title, complete, estimate`,
      title,
      complete,
      estimate,
      embedding ? embeddingToSQL(embedding) : null
    );

    res.json(newTodo);
  } catch (error: any) {
    console.log("error adding task: " + error.message);
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error: " + error.message,
    });
  }
});

// update tasks for tenant
// No need for "tenant_id" in the where clause because we are in the tenant virtual DB
app.put("/api/tenants/:tenantId/todos", async (req, res) => {
  try {
    const tenantDB = tenantContext.getStore();
    const { id, complete } = req.body;
    // it doesn't actually update many, but Prisma doesn't know are in the virtual tenant DB
    await tenantDB?.todos.updateMany({
      where: {
        id: id,
      },
      data: {
        complete: complete,
      },
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
    const tenantDB = tenantContext.getStore();
    // No need for a "where" clause here because we are setting the tenant ID in the context
    const todos = await tenantDB?.todos.findMany();
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
    const tenantDB = tenantContext.getStore();
    const todos = await tenantDB?.todos.findMany();
    res.json(todos);
  } catch (error: any) {
    console.log("error in insecure endpoint: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
