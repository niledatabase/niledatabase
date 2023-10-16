import "dotenv/config";
import express from "express";
import jwtDecode from 'jwt-decode';
import { toCookieData, NileJWTPayload, getUserToken, getUserId, isLoggedin } from "./authUtils";
import Server from "@theniledev/server";
import cookieParser from "cookie-parser";

export const nile = Server({
  workspace: String(process.env.NILE_WORKSPACE), 
  database: String(process.env.NILE_DATABASE),
  api: {
    basePath: process.env.NILE_API_BASE_PATH,
  },
  db: {
    connection: {
      host: process.env.NILE_DB_HOST,
      user: process.env.NILE_DB_USER,
      password: process.env.NILE_DB_PASSWORD,
    },
  },
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Middleware to check if user is authenticated, important to load it *after* cookie parser
app.use('/api/tenants', (req, res, next) => {
  if (!isLoggedin(req.cookies)) {
    console.log("can't serve " + req.path + " - user not logged in")
    return res.status(401).json({
      message: "Unauthorized. Try logging in again.",
    });
  }
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
  };

  const userToken = getUserToken(req.cookies);
  nile.token = userToken;
  let tenantID = null;

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
  const userId = getUserId(req.cookies);
  let tenants:any = [];

  try {
    // TODO: Replace with API call to get tenants for user when the SDK supports this
    if (userId) {
      tenants = await nile.db("tenants")
        .select("tenants.id","tenants.name")
        .join("users.tenant_users", "tenants.id", "=", "tenant_users.tenant_id")
        .where("tenant_users.user_id", "=", userId);
      res.json(tenants);
    }; // if we don't have a user id, return empty array. TODO: Will be better to redirect to login page
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
  const { tenantId } = req.params;
  nile.tenantId = tenantId; // set tenant ID for subsequenct operations
  const userToken = getUserToken(req.cookies);
  nile.token = userToken;

  // Get tenant name doesn't need any input parameters because it uses the tenant ID from the context
  try {
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
    const { tenantId } = req.params;
    const { title, complete } = req.body;

    const newTodo = await nile.db("todos")
      .insert({
        title: title,
        complete: complete || false,
        tenant_id: tenantId,
      })
      .returning("*");

    res.json(newTodo);
  } catch (error: any) {
    console.log("error adding task: "+ error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// update tasks for tenant - note that we don't handle partial updates here
// TODO: This should be for specific todo ID, not all todos with same title
// TODO: Use Nile User Context which will validate that the user has permission to update this tenant
app.put("/api/tenants/:tenantId/todos", async (req, res) => {  
  try {
    const { tenantId } = req.params;
    const { title, complete } = req.body;
    await nile.db("todos").update('complete', complete).where("tenant_id", tenantId).andWhere("title", title);
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
    const { tenantId } = req.params;

    /*const tenantDB = prisma.$extends(forTenant(tenantId)) */

    // Tenant context not actually working yet...
    // const todos = await db('todos').withTenant(tenantId).select('*');
    const todos = await nile.db("todos").select("*").where("tenant_id", tenantId).orderBy("title");
    res.json(todos);
  } catch (error: any) {
    console.log( "error listing tasks: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// insecure endpoint to get all todos - don't try this in production 😅
app.get("/insecure/all_todos", async (req, res) => {
  try {
    const todos = await nile.db("todos").select("*");
    res.json(todos);
  } catch (error: any) {
    console.log("error in insecure endpoint: " + error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});


// Handle logins via Nile's OIDC / OAuth2 flow
app.post('/auth/handler', async (req, res) => {
  const formData = req.body;
  const event = formData.event;
  const fe_url = process.env.FE_URL || "http://localhost:3006";

  // note that we are responding with 303 redirects in order to trigger a GET request for client-side redirect
  try {
    // detect error response early. The exception handler can handle all errors.
    if (event === 'AUTH_ERROR') {
      throw new Error(formData.error);
    }
    const accessToken = String(formData.access_token);
    const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
    const cookieData = toCookieData(formData, decodedJWT);
    res.cookie('authData', JSON.stringify(cookieData), {secure: process.env.NODE_ENV !== 'development'});
    res.redirect(303, fe_url+"/tenants"); // once user is authenticated, redirect to tenants page
  } catch (e: any) {
    console.log("error while handling auth response: " + e.message);
    res.cookie('errorData', JSON.stringify(e.message), {secure: process.env.NODE_ENV !== 'development'});
    res.redirect(303,fe_url+"/"); // if there is an error, redirect to home page
  }
});
