from typing import Optional
from sqlmodel import Field, Session, SQLModel, create_engine
import uuid
from tenant_middleware import get_tenant_id

# TODO: Move to use environment variables
engine = create_engine(
    "postgresql://018b4937-2bbf-70fd-9075-37154198fa0f:358844ef-cb09-4758-ae77-bec13b8011eb@db.thenile.dev:5432/charming_flower",
    echo=True)

# use this for cases where you don't want a specific tenant database, when creating a new tenant or signing up new users
def get_global_session():
    session = Session(bind=engine, expire_on_commit=False)
    yield session

# This is a session for a specific tenant DB. 
# If there is no valid tenant_id in the context, it will throw a ValueError and the request handler will not execute the query.
def get_tenant_session():
    session = Session(bind=engine, expire_on_commit=False)
    try: 
        tenant_id = UUID(get_tenant_id())
        query = f"SET nile.tenant_id={tenant_id};"
        session.execute(query)
        yield session  # Important to use yield here, so the request handler will call the cleanup code after the request is done.
    except:
        session.rollback()
        raise
    finally: # This will run after the request handler is finished with the session
        session.execute("RESET nile.tenant_id;")
        session.commit()
        pass

class Todo(SQLModel, table=True):
    __tablename__ = "todos"
    id: uuid.UUID = Field(primary_key=True, default_factory=uuid.uuid4)
    tenant_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    title: str
    complete: bool = False    
class Tenant(SQLModel, table=True):
    __tablename__ = "tenants"
    id: uuid.UUID = Field(primary_key=True, default_factory=uuid.uuid4)
    name: str