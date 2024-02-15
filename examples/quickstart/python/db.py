from typing import Optional
from sqlmodel import  Session, create_engine, text
from sqlalchemy import MetaData
from tenant_middleware import get_tenant_id, get_user_id

# TODO: Move to use environment variables
engine = create_engine(
    "postgresql://018b4937-2bbf-70fd-9075-37154198fa0f:358844ef-cb09-4758-ae77-bec13b8011eb@db.thenile.dev:5432/charming_flower",
    echo=True)

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
        user_id = get_user_id()
        session.execute(text(f"SET nile.tenant_id='{tenant_id}';"))
        # This will raise an error if user_id doesn't exist or doesn't have access to the tenant DB.
        session.execute(text(f"SET nile.user_id='{user_id}';")) 
        yield session  # Important to use yield here, so the request handler will call the cleanup code after the request is done.
    except:
        session.rollback()
        raise
    finally: # This will run after the request handler is finished with the session
        session.execute(text("RESET nile.user_id;"))
        session.execute(text("RESET nile.tenant_id;"))
        session.commit()
        pass