import "dotenv/config";
import express from "express";
import jwtDecode from "jwt-decode";
import {
  toCookieData,
  NileJWTPayload,
  getUserToken,
  getUserId,
  isLoggedin,
} from "./authUtils";
import Server from "@niledatabase/server";
import cookieParser from "cookie-parser";

export const nile = new Server();

await nile.init();

const fe_url = process.env.FE_URL || "http://localhost:3006";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware to check if user is authenticated, important to load it *after* cookie parser
app.use("/api/tenants", (req, res, next) => {
  // Technically we don't need to validate the token. Nile will do this for us.
  // But it is nice to handle the error in one place and not in each handler
  if (!isLoggedin(req.cookies)) {
    console.log("can't serve " + req.path + " - user not logged in");
    return res.status(401).json({
      message: "Unauthorized. Try logging in again.",
    });
  }
  // If we are here, the user is logged in. Set the token and user ID in the context
  nile.token = getUserToken(req.cookies);
  nile.userId = getUserId(req.cookies);
  next();
});

// set the tenant ID in the context based on the URL parameter - this runs after the auth middleware
app.param("tenantId", (req, res, next, tenantId) => {
  nile.tenantId = tenantId;
  next();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// endpoint to create new tenants
app.post("/api/tenants", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      message: "No tenant name provided",
    });
  }

  try {
    const createTenantResponse = await nile.api.tenants.createTenant({
      name: name,
    });
    const tenant = await createTenantResponse.json();
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
  let tenants: any = [];
  nile.tenantId = null; // clear tenant ID in case it was set before, because we need to show a list of all tenants

  try {
    // TODO: Replace with API call to get tenants for user when the SDK supports this
    if (nile.userId) {
      // since we check for login in the middleware, we know that the user ID is set
      tenants = await nile.db.query(
        `SELECT tenants.id, tenants.name
         FROM tenants
         JOIN users.tenant_users ON tenants.id = tenant_users.tenant_id
         WHERE tenant_users.user_id = $1`,
        [nile.userId]
      );
      res.json(tenants.rows);
    }
  } catch (error: any) {
    console.log("error listing tenants: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Return tenant details.
// Note that this just passes the request over to Nile.
// It is necessary because the browser can't call Nile APIs directly due to CORS restrictions.
app.get("/api/tenants/:tenantId", async (req, res) => {
  try {
    // Get tenant name doesn't need any input parameters because it uses the tenant ID from the context
    const tenantResponse = await nile.api.tenants.getTenant();
    if (tenantResponse.status === 401) {
      return res.status(401).json({
        message: "Unauthorized. Please log in again.",
      });
    }
    const tenant = await tenantResponse.json();
    res.json(tenant);
  } catch (error: any) {
    console.log("error getting tenant details: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// add new task for tenant
app.post("/api/tenants/:tenantId/todos", async (req, res) => {
  try {
    const { title, complete } = req.body;

    const newTodo = await nile.db.query(
      `INSERT INTO todos (title, complete, tenant_id)
      VALUES ($1, $2, $3)
      RETURNING *;`,
      [
        title,
        complete || false,
        nile.tenantId, // setting from context
      ]
    );

    res.json(newTodo.rows);
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

// Handle logins via Nile's OIDC / OAuth2 flow
app.post("/auth/handler", async (req, res) => {
  const formData = req.body;
  const event = formData.event;

  // note that we are responding with 303 redirects in order to trigger a GET request for client-side redirect
  try {
    // detect error response early. The exception handler can handle all errors.
    if (event === "AUTH_ERROR") {
      throw new Error(formData.error);
    }
    const accessToken = String(formData.access_token);
    const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
    const cookieData = toCookieData(formData, decodedJWT);
    res.cookie("authData", JSON.stringify(cookieData), {
      secure: process.env.NODE_ENV !== "development",
    });
    res.redirect(303, fe_url + "/tenants"); // once user is authenticated, redirect to tenants page
  } catch (e: any) {
    console.log("error while handling auth response: " + e.message);
    res.cookie("errorData", JSON.stringify(e.message), {
      secure: process.env.NODE_ENV !== "development",
    });
    res.redirect(303, fe_url + "/"); // if there is an error, redirect to home page
  }
});

// handle email signups
app.post("/api/sign-up", async (req, res) => {
  const resp = await nile.api.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  });

  // if signup was successful, we want to set the cookies and headers, so it will log the user in too
  // Note that this is optional, check the authentication quickstart for a simpler example of using the Nile SDK for authentication
  if (resp && resp.status >= 200 && resp.status < 300) {
    const body = await resp.json();
    const accessToken = body.token.jwt;
    const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
    const cookieData = {
      accessToken: accessToken,
      tokenData: decodedJWT,
    };
    res.cookie("authData", JSON.stringify(cookieData), {
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(resp.status).json(JSON.stringify(body));
  } else {
    // The API sends errors in plain text, so we need to handle them before trying to parse the JSON
    const body = await resp.text();
    const err = "got error response: " + body + " " + resp.status;
    console.log(err);
    res.status(resp.status).json(JSON.stringify(body));
  }
});

// handle email logins
app.post("/api/login", async (req, res) => {
  const resp = await nile.api.auth.login({
    email: req.body.email,
    password: req.body.password,
  });

  // if signup was successful, we want to set the cookies
  if (resp && resp.status >= 200 && resp.status < 300) {
    const body = await resp.json();
    const accessToken = body.token.jwt;
    const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
    const cookieData = {
      accessToken: accessToken,
      tokenData: decodedJWT,
    };
    res.cookie("authData", JSON.stringify(cookieData), {
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(resp.status).json(JSON.stringify(body));
  } else {
    // The API sends errors in plain text, so we need to handle them before trying to parse the JSON
    const body = await resp.text();
    const err = "got error response: " + body + " " + resp.status;
    console.log(err);
    res.status(resp.status).json(JSON.stringify(body));
  }
});
