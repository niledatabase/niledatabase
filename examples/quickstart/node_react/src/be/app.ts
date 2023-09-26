import "dotenv/config";
import express from "express";
import Server from "@theniledev/server";
import Knex from "knex";

export const { db } = Server({
  workspace: "", // leaving this empty, as we don't need it for this example
  database: String(process.env.NILE_DATABASE),
  db: {
    connection: {
      host: process.env.NILE_HOST,
      user: process.env.NILE_USER,
      password: process.env.NILE_PASSWORD,
    },
  },
});

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// endpoint to create new tenants
app.post("/tenants", async (req, res) => {
  console.log("body: " + JSON.stringify(req.body));
  try {
    const { name } = req.body;
    console.log("tenant name:" + JSON.stringify(name));

    const newTenant = await db("tenants")
      .insert({
        name: name,
      })
      .returning("id");
    console.log("new tenant: " + JSON.stringify(newTenant));

    res.json(newTenant);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/tenants", async (req, res) => {
  try {
    const tenants = await db("tenants").select("*");
    res.json(tenants);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.post("/tenants/:tenantId/todos", async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { title, complete } = req.body;

    const newTodo = await db("todos")
      .insert({
        title: title,
        complete: complete || false,
        tenant_id: tenantId,
      })
      .returning("*");

    res.json(newTodo);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/tenants/:tenantId/todos", async (req, res) => {
  try {
    const { tenantId } = req.params;

    /*const tenantDB = prisma.$extends(forTenant(tenantId)) */

    // Tenant context not actually working yet...
    // const todos = await db('todos').withTenant(tenantId).select('*');
    const todos = await db("todos").select("*").where("tenant_id", tenantId);
    res.json(todos);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// insecure endpoint to get all todos - don't try this in production 😅
app.get("/insecure/all_todos", async (req, res) => {
  try {
    const todos = await db("todos").select("*");
    res.json(todos);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
