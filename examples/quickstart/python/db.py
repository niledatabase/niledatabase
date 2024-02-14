from typing import Optional
from sqlmodel import Field, Session, SQLModel, create_engine, text
from sqlalchemy import MetaData
from uuid import UUID, uuid4
from tenant_middleware import get_tenant_id

# TODO: Move to use environment variables
engine = create_engine(
    "postgresql://018b4937-2bbf-70fd-9075-37154198fa0f:358844ef-cb09-4758-ae77-bec13b8011eb@db.thenile.dev:5432/charming_flower",
    echo=True)

users_schema = MetaData(schema="users")
auth_schema = MetaData(schema="auth")

# use this for cases where you don't want a specific tenant database, when creating a new tenant or signing up new users
def get_global_session():
    session = Session(bind=engine, expire_on_commit=False)
    yield session

# This is a session for a specific tenant DB. 
# If there is no valid tenant_id in the context, it will throw an exception (InvalidTextRepresentation) and the request will fail.
def get_tenant_session():
    session = Session(bind=engine, expire_on_commit=False)
    try: 
        tenant_id = get_tenant_id()
        session.execute(text(f"SET nile.tenant_id='{tenant_id}';"))
        yield session  # Important to use yield here, so the request handler will call the cleanup code after the request is done.
    except:
        session.rollback()
        raise
    finally: # This will run after the request handler is finished with the session
        session.execute(text("RESET nile.tenant_id;"))
        session.commit()
        pass

class Todo(SQLModel, table=True):
    __tablename__ = "todos"
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    tenant_id: UUID
    title: str
    complete: bool = False    
class Tenant(SQLModel, table=True):
    __tablename__ = "tenants"
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    name: str
    
# Nile has additional optional fields for username, given name, etc.
class User(SQLModel, table=True):
    __tablename__ = "users"
    metadata = users_schema
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    email: str
    
class TenantUsers(SQLModel, table=True):
    __tablename__ = "tenant_users"
    metadata = users_schema
    user_id: UUID = Field(primary_key=True)
    tenant_id: UUID = Field(primary_key=True)
    role: str

class Credentials(SQLModel, table=True):
    __tablename__ = "credentials"
    metadata = auth_schema
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    user_id: UUID
    method: str
    payload: str = Field(sa_column=text("jsonb"))