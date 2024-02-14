import logging
from fastapi import Depends, FastAPI, HTTPException, Body
from typing import Annotated
from uuid import UUID
from sqlmodel import text
from passlib.hash import bcrypt
import json
from db import Tenant, Todo, User, Credentials, get_tenant_session, get_global_session
from tenant_middleware import TenantAwareMiddleware, get_tenant_id

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI()
app.add_middleware(TenantAwareMiddleware)

@app.get("/")
def home():
# TODO: Something Nile-y
    return {"message": "First FastAPI app"}

# TODO: Add optional ID parameter
@app.post("/api/tenants")
async def create_tenant(tenant:Tenant, session = Depends(get_global_session)):
    session.add(tenant)
    session.commit()
    return tenant

@app.get("/api/tenants")
async def get_tenants(session = Depends(get_global_session)):
    tenants = session.query(Tenant).all()
    return tenants

@app.post("/api/todos")
async def create_todo(todo:Todo, session = Depends(get_tenant_session)):
    logger.debug(f"Tenant ID: {get_tenant_id()}")
    # Nile won't automatically set the tenant_id for you, so we get it from the context
    todo.tenant_id = get_tenant_id(); 
    session.add(todo)
    session.commit()
    return todo

# Note the lack of where clause here. 
# We are using the tenant_id context variable to connect to the tenant DB 
# and only see the todos for that tenant.
@app.get("/api/todos")
async def get_todos(session = Depends(get_tenant_session)):
    todos = session.query(Todo).all()
    return todos

# Note that this endpoint is identical to the previous one
# but it uses the global session instead of the tenant session.
# This means it will return all todos from all tenants. 
# Which is why it is insecure and you should avoid it in production
@app.get("/api/insecure")
async def get_todos_insecure(session = Depends(get_global_session)):
    todos = session.query(Todo).all()
    return todos



### Authentication
### Note that this is slightly different from the example in the FastAPI docs
### We use cookies with JWT instead of passing the token in the header - this is more secure and simpler with the React frontend
### We are not using Nile API's here because until we have Nile SDK for Python, it is easier to use the database directly


@app.post("/api/sign-up")
async def sign_up(email: Annotated[str, Body()], password: Annotated[str, Body()], session = Depends(get_global_session)):
    user = User(email=email)
    session.add(user) 
    session.commit()
    logger.debug(f"User: {user}")
    # Using raw SQL here due to combination of jsonb and crypt functions
    query = '''
    INSERT INTO auth.credentials(user_id, method, payload) VALUES 
                                       ('{}', 'PASSWORD',
                                       jsonb_build_object('crypt', 'crypt-bf/8', 'hash', public.crypt('{}', gen_salt('bf', 8))));
    '''.format(user.id, password)
    credentials = session.execute(text(query))
    session.commit()
    # TODO: Right now, we are just returning the user object, but we should return a JWT token, put it in a cookie, and set the headers
    return user

@app.post("/api/login")
async def login(email:str, password:str, session = Depends(get_global_session)):
    input_hash = bcrypt.hash(password)
    # Using raw SQL here due to combination of jsonb and crypt functions
    try:
        user = session.execute(text(f"SELECT * FROM users.users WHERE email = '{email}'")).first()
        credentials = session.execute(text(f"SELECT * FROM auth.credentials WHERE user_id = '{user.id}' AND method = 'PASSWORD'")).first()
        payload = json.loads(credentials.payload)
        if bcrypt.verify(password, payload['hash']):
            return user; # TODO: Return JWT token, put it in a cookie, and set the headers
        else:
            raise HTTPException(status_code=400, detail="Incorrect username or password")
    except:
        raise HTTPException(status_code=500, detail="Login failed")
            
            


# // handle email signups
# app.post('/api/sign-up', async (req, res) => {
#   const resp = await nile.api.auth.signUp(
#     {
#       email: req.body.email,
#       password: req.body.password,
#     }
#   );

#   // if signup was successful, we want to set the cookies and headers, so it will log the user in too
#   // Note that this is optional, check the authentication quickstart for a simpler example of using the Nile SDK for authentication
#   if (resp && resp.status >= 200 && resp.status < 300) {
#       const body =  await resp.json();
#       const accessToken = body.token.jwt;
#       const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
#       const cookieData = {
#           accessToken: accessToken,
#           tokenData: decodedJWT,
#         };
#       res.cookie('authData', JSON.stringify(cookieData), {secure: process.env.NODE_ENV !== 'development'});
#       res.status(resp.status).json(JSON.stringify(body));
#     } else  {
#       // The API sends errors in plain text, so we need to handle them before trying to parse the JSON
#       const body = await resp.text();
#       const err = "got error response: " + body + " " + resp.status;
#       console.log(err);
#       res.status(resp.status).json(JSON.stringify(body));
#   }
# });

# // handle email logins
# app.post('/api/login', async (req, res) => {
#   const resp = await nile.api.auth.login({
#     email: req.body.email,
#     password: req.body.password,
#   });

#   // if signup was successful, we want to set the cookies
#   if (resp && resp.status >= 200 && resp.status < 300) {
#       const body =  await resp.json();
#       const accessToken = body.token.jwt;
#       const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
#       const cookieData = {
#           accessToken: accessToken,
#           tokenData: decodedJWT,
#           };
#       res.cookie('authData', JSON.stringify(cookieData), {secure: process.env.NODE_ENV !== 'development'});
#       res.status(resp.status).json(JSON.stringify(body));
#   } else  {
#       // The API sends errors in plain text, so we need to handle them before trying to parse the JSON
#       const body = await resp.text();
#       const err = "got error response: " + body + " " + resp.status;
#       console.log(err);
#       res.status(resp.status).json(JSON.stringify(body));
#   }

# });


# // Handle logins via Nile's OIDC / OAuth2 flow
# app.post('/auth/handler', async (req, res) => {
#   const formData = req.body;
#   const event = formData.event;

#   // note that we are responding with 303 redirects in order to trigger a GET request for client-side redirect
#   try {
#     // detect error response early. The exception handler can handle all errors.
#     if (event === 'AUTH_ERROR') {
#       throw new Error(formData.error);
#     }
#     const accessToken = String(formData.access_token);
#     const decodedJWT = jwtDecode<NileJWTPayload>(accessToken);
#     const cookieData = toCookieData(formData, decodedJWT);
#     res.cookie('authData', JSON.stringify(cookieData), {secure: process.env.NODE_ENV !== 'development'});
#     res.redirect(303, fe_url+"/tenants"); // once user is authenticated, redirect to tenants page
#   } catch (e: any) {
#     console.log("error while handling auth response: " + e.message);
#     res.cookie('errorData', JSON.stringify(e.message), {secure: process.env.NODE_ENV !== 'development'});
#     res.redirect(303,fe_url+"/"); // if there is an error, redirect to home page
#   }
# });