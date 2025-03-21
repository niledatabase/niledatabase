from typing import Optional
from sqlmodel import  Session, create_engine, text
import os
from dotenv import load_dotenv
load_dotenv()
from tenant_middleware import get_tenant_id, get_user_id


log_sql = my_env = os.getenv("LOG_SQL", 'False').lower() in ('true', '1', 't')
engine = create_engine(
    os.getenv("DATABASE_URL"),
    echo=log_sql)

# use this for cases where you don't want a specific tenant database, when creating a new tenant or signing up new users
def get_global_session():
    session = Session(bind=engine)
    yield session

# This is a session for a specific tenant DB. 
# If there is no valid tenant_id in the context, it will throw an exception (InvalidTextRepresentation) and the request will fail.
def get_tenant_session():
    session = Session(bind=engine)
    try: 
        tenant_id = get_tenant_id()
        user_id = get_user_id()
        session.execute(text(f"SET LOCAL nile.tenant_id='{tenant_id}';"))
        # This will raise an error if user_id doesn't exist or doesn't have access to the tenant DB.
        session.execute(text(f"SET LOCAL nile.user_id='{user_id}';")) 
        yield session  # Important to use yield here, so the request handler will call the cleanup code after the request is done.
    except:
        session.rollback()
        raise
    finally: # This will run after the request handler is finished with the session
        session.commit()
        pass