import logging
import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import Depends, FastAPI, HTTPException, Body, status, Response, Request
from typing import Annotated
from uuid import UUID
from sqlmodel import text
from passlib.hash import bcrypt

from db import get_tenant_session, get_global_session
from models import Tenant, Todo, User, Token, TenantUsers
from tenant_middleware import TenantAwareMiddleware, get_tenant_id, get_user_id
from auth import authenticated_user, create_access_token

logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))
logger = logging.getLogger(__name__)

app = FastAPI()
app.add_middleware(TenantAwareMiddleware)

# Tenant APIs operate in the global DB, not a tenant DB. So we use the global session and need to check for user_id validity ourselves

@app.post("/api/tenants")
async def create_tenant(tenant:Tenant, request: Request, session = Depends(get_global_session)):
    user_id: UUID = get_user_id()
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You need to be logged in to create a tenant"
        )
    session.add(tenant)
    session.commit()

    # we also need to connect the current user to the tenant
    user_tenant: TenantUsers = TenantUsers(user_id=user_id, tenant_id=tenant.id)
    session.add(user_tenant)
    session.commit()
    return tenant

@app.get("/api/tenants")
async def get_tenants(request: Request, session = Depends(get_global_session)):
    user_id: UUID = get_user_id()
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You need to be logged in to create a tenant"
        )
    tenants = session.query(Tenant).select_from(TenantUsers).join(Tenant, Tenant.id == TenantUsers.tenant_id).filter(TenantUsers.user_id == user_id).all()
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
async def sign_up(email: Annotated[str, Body()], password: Annotated[str, Body()], response: Response, session = Depends(get_global_session)):
    user = User(email=email)
    session.add(user) 
    session.commit()
    logger.debug(f"User: {user}")
    # Using raw SQL here due to combination of jsonb and crypt functions
    query = '''
    INSERT INTO auth.credentials(user_id, method, payload) VALUES 
                                       ('{}', 'PASSWORD',
                                       jsonb_build_object('crypt', 'crypt-bf/8', 'hash', public.crypt('{}', public.gen_salt('bf', 8))));
    '''.format(user.id, password)
    credentials = session.execute(text(query))
    session.commit()
    
    access_token = create_access_token(user)
    response.set_cookie(key="access_token", value=access_token)
    return Token(access_token=access_token, token_type="bearer")
    return user

# We are returning both token and cookie, so the JWT can be used in both the frontend and backend
@app.post("/api/login")
async def login(email: Annotated[str, Body()], password: Annotated[str, Body()], response: Response, session = Depends(get_global_session)):
    user: User = authenticated_user(email, password, session)
    if not user:
        logger.warn(f"Login failed for user: {email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    access_token = create_access_token(user)
    response.set_cookie(key="access_token", value=access_token)
    return Token(access_token=access_token, token_type="bearer")
            
# TODO: Social login handler          