import "dotenv/config";
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

import {
  embedTask,
  findSimilarTasks,
  aiEstimate,
  EmbeddingTasks,
  embeddingToSQL,
} from "./AiUtils.js";
import { Nile } from "@niledatabase/server";
import { NileExpressHandler } from "@niledatabase/server/express";

const fe_url = process.env.FE_URL || "http://localhost:3006";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nile = await Nile({
  api: {
    secureCookies: process.env.VERCEL === "1",
    origin: fe_url,
  },
  debug: true,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the Vite React app build directory
app.use(express.static(path.join(__dirname, '../fe')));

const { paths, handler } = await NileExpressHandler(nile, {
  muteResponse: true,
});
app.get(paths.get, handleRoutes);
app.post(paths.post, handleRoutes);
app.put(paths.put, handleRoutes);
app.delete(paths.delete, handleRoutes);

async function handleRoutes(
  req: Request & { originalUrl: string; url: string },
  res: any,
  next: any
) {
  try {
    // because a proxy is used, we must re-create the valid that goes to the FE
    req.url = `${fe_url}${req.originalUrl}`;
    console.log("request headers", req.headers);
    const response = await handler(req);

    if (response) {
      const { status, headers, body } = response;
      console.log("response from nile:");
      console.log(status, headers, body);
      res.status(status).set(headers);
      if (typeof body === "string") {
        res.send(body);
      } else {
        res.json(body ?? {});
      }
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// set the tenant ID in the context based on the URL parameter - this runs after the auth middleware
app.param("tenantId", (req, res, next, tenantId) => {
  nile.tenantId = tenantId;
  next();
});

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
    return [0, 0, 0];
  });

  const newTodo = await nile.db.query(
    `INSERT INTO todos (tenant_id, title, complete, estimate, embedding)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`,
    [
      nile.tenantId, // could also be req.params.tenantId, but see `app.param("tenantId")`
      title,
      complete || false,
      estimate,
      embeddingToSQL(embedding),
    ]
  );

  res.json(newTodo.rows[0]);
});

// update tasks for tenant - note that we don't handle partial updates here
// No need for where clause because we have the tenant in the context
app.put("/api/tenants/:tenantId/todos", async (req, res) => {
  try {
    const { id, complete } = req.body;
    nile.tenantId = req.params.tenantId;
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
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../fe', 'index.html'));
});
