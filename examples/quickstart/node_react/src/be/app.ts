import "dotenv/config";
import express, { Application, RequestHandler } from "express";
import path from "path";
import { fileURLToPath } from "url";

import {
  embedTask,
  findSimilarTasks,
  aiEstimate,
  EmbeddingTasks,
  embeddingToSQL,
} from "./AiUtils.js";
import { Nile } from "@niledatabase/server";
import { express as nileExpress } from "@niledatabase/express";

const fe_url = process.env.FE_URL || "http://localhost:3006";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const nile = Nile({
  origin: fe_url,
  debug: true,
  extensions: [nileExpress(app)],
});

// Serve static files from the Vite React app build directory
app.use(express.static(path.join(__dirname, "../fe")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// add new task for tenant
app.post("/api/tenants/:tenantId/todos", async (req, res) => {
  const { title, complete } = req.body;

  if (!title) {
    res.status(400).json({
      message: "No task title provided",
    });
  }

  const similarTasks = await findSimilarTasks(nile, title).catch((e) => {
    console.error(e);
    return [{ title, estimate: "unknown" }];
  });
  const estimate = await aiEstimate(title, similarTasks).catch((e) => {
    console.error(e);
    return "unknown";
  });
  // get the stored embedding for the task
  const embedding = await embedTask(
    title,
    EmbeddingTasks.SEARCH_DOCUMENT
  ).catch((e) => {
    console.error(e);
    return new Array(768).fill(0);
  });

  try {
    const newTodo = await nile.db.query(
      `INSERT INTO todos (tenant_id, title, complete, estimate, embedding)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`,
      [
        nile.getContext().tenantId, // could also be req.params.tenantId, but express extension overrides get/set context via AsyncLocalStorage
        title,
        complete || false,
        estimate,
        embeddingToSQL(embedding),
      ]
    );

    res.json(newTodo.rows[0]);
  } catch (e) {
    console.error(e);
  }
});

// update tasks for tenant - note that we don't handle partial updates here
// No need for where clause because we have the tenant in the context
app.put("/api/tenants/:tenantId/todos", async (req, res) => {
  try {
    const { id, complete } = req.body;
    await nile.db.query(
      `UPDATE todos 
       SET complete = $1
       WHERE id = $2`,
      [complete, id]
    );
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
    const todos = await nile.db.query(
      `SELECT * FROM todos 
       ORDER BY title`
    );
    res.json(todos.rows);
  } catch (error: any) {
    console.log("error listing tasks: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// insecure endpoint to get all todos - don't try this in production 😅
app.get("/insecure/all_todos", async (req, res) => {
  try {
    const todos = await nile.db.query(`SELECT * FROM todos`);
    res.json(todos.rows);
  } catch (error: any) {
    console.log("error in insecure endpoint: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// All other GET requests not handled before will return the React app's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../fe", "index.html"));
});
