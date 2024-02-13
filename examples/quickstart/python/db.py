from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
import uuid
from tenant_middleware import get_tenant_id

# TODO: Move to use environment variables
url = URL.create(
    drivername="postgresql",
    username="018b4937-2bbf-70fd-9075-37154198fa0f",
    password="358844ef-cb09-4758-ae77-bec13b8011eb",
    host="db.thenile.dev",
    database="charming_flower",
    port=5432
)

engine = create_engine(url, echo=True)

# use this for cases where you don't want a specific tenant database, when creating a new tenant or signing up new users
def get_global_session():
    Session = sessionmaker(bind=engine, expire_on_commit=False)
    with Session() as session:
        yield session

# This is a session for a specific tenant DB. 
# If there is no valid tenant_id in the context, it will throw a ValueError and the request handler will not execute the query.
def get_tenant_session():
    Session = sessionmaker(bind=engine, expire_on_commit=False)
    with Session() as session:
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
    

Base = declarative_base()

class Todo(Base):
    __tablename__ = "todos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(UUID(as_uuid=True), default=uuid.uuid4)
    title = Column(String)
    complete = Column(Boolean, default=False)
    
class Tenant(Base):
    __tablename__ = "tenants"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)