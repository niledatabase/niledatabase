import logging
from fastapi import Depends, FastAPI
from typing import Annotated
from uuid import UUID
from db import Tenant, Todo, get_tenant_session, get_global_session
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
    todo.tenant_id = get_tenant_id(); # Nile won't automatically set the tenant_id for you, so we get it from the context
    session.add(todo)
    session.commit()
    return todo

# Note the lack of where clause here. 
# We are using the tenant_id context variable to connect to the tenant DB and only see the todos for that tenant.
@app.get("/api/todos")
async def get_todos(session = Depends(get_tenant_session)):
    todos = session.query(Todo).all()
    return todos

# Note that this endpoint is identical to the previous one, but it uses the global session instead of the tenant session.
# This means it will return all todos from all tenants. Which is why it is insecure and you should avoid it in production
@app.get("/api/insecure")
async def get_todos_insecure(session = Depends(get_tenant_session)):
    todos = session.query(Todo).all()
    return todos
