import os
import time
import modal
from uuid import UUID
from typing import Annotated
import logging

from fastapi import FastAPI, Depends, HTTPException, status, Request, Body, Response
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel

# DB related imports
from tenant_middleware import TenantAwareMiddleware, get_tenant_id, get_user_id
from db import get_tenant_session, get_global_session
from models import Tenant,User, Token, TenantUsers
from sqlalchemy.exc import SQLAlchemyError
from sqlmodel import text, select

from constants import MODELS_DIR, DEFAULT_NAME, DEFAULT_REVISION, app_name, MODELS_VOLUME
from auth import authenticated_user, create_access_token
from llm_app import llm_app, Model

logging.basicConfig(level=os.getenv("LOG_LEVEL", "DEBUG"))
logger = logging.getLogger(__name__)
hpack_logger = logging.getLogger('hpack')
hpack_logger.setLevel(logging.WARN)

web_app = FastAPI()

# This middleware integrates our webapp with Nile's tenant isolation
web_app.add_middleware(TenantAwareMiddleware)

# This is the image for the webapp. We need to install some dependencies that don't come with the default image.
# We are also installing a newer version of FastAPI and Pydantic than the default ones in the base image.
image = modal.Image.debian_slim(python_version="3.10").pip_install(
    "passlib",
    "python-jose",
    "sqlmodel",
    "pgvector",
    "pydantic",
    "fastapi",
    "python-dotenv",
    "psycopg2-binary",
    "sqlalchemy"
)

app = modal.App(name=app_name+"-web", image=image)
app.include(llm_app)

@web_app.get("/api/tenants")
async def get_tenants(request: Request, session = Depends(get_global_session)):
    user_id: UUID = get_user_id()
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You need to be logged in to list tenants"
        )
    tenants = session.query(Tenant).select_from(TenantUsers).join(Tenant, Tenant.id == TenantUsers.tenant_id).filter(TenantUsers.user_id == user_id).all()
    return tenants


#@app.function()
#@modal.web_endpoint(method="GET")
#def get_sales_insight():
#    model = Model()
#    result = model.generate.remote(
#        "What is the best way to improve sales? be concise and give just one tip."
#    )
#    return result;
#
# @app.local_entrypoint()
# def main():
#    get_sales_insight.remote()

### Authentication
### Note that this is slightly different from the example in the FastAPI docs
### We use cookies with JWT instead of passing the token in the header - this is more secure and simpler with the React frontend
### We are not using Nile API's here because until we have Nile SDK for Python, it is easier to use the database directly

# For some reason directly using Body() doesn't work here. Starlette validation is looking for the query parameters instead of the body.
class LoginData(BaseModel):
    email: str
    password: str

@web_app.post("/api/sign-up")
async def sign_up(login_data: LoginData, response: Response, session = Depends(get_global_session)):
    logger.info(f"Signing up user: {login_data.email}")
    user = User(email=login_data.email)
    try:
        session.add(user) 
        session.commit()
    except SQLAlchemyError as e:
        logger.error(f"Error: {e}")
        error = str(e.__dict__['orig'])
        if "duplicate key value violates unique constraint" in error:
            response.status_code = status.HTTP_409_CONFLICT
            return f'User already exists with email: {login_data.email}'
        else:
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            return "Internal server error"
    logger.debug(f"User: {user}")
    # Using raw SQL here due to combination of jsonb and crypt functions
    query = '''
    INSERT INTO auth.credentials(user_id, method, payload) VALUES 
                                       ('{}', 'PASSWORD',
                                       jsonb_build_object('crypt', 'crypt-bf/8', 'hash', public.crypt('{}', public.gen_salt('bf', 8))));
    '''.format(user.id, login_data.password)
    
    try:
        credentials = session.execute(text(query))
        session.commit()
    except SQLAlchemyError as e:
        logger.error(f"Error: {e}")
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return "Internal server error"

    access_token = create_access_token(user)
    response.set_cookie(key="access_token", value=access_token)
    response.set_cookie(key="user_data", value=jsonable_encoder(user))
    
    # Due to the nature of the example, we are going to add the user to existing tenants. 
    # You'll probably never want to do this in production.
    try:
        for tenant in session.query(Tenant).all():
            # Work around to:
            # ERROR:web_app:Error adding user to tenants : (psycopg2.errors.FeatureNotSupported) cannot determine tenant ID. Tenant ID must be a constant or a parameter reference (i.e: $1)
            query = '''
            INSERT INTO users.tenant_users(user_id, tenant_id) VALUES ('{}', '{}');
            '''.format(user.id, tenant.id)
            session.execute(text(query))
            # We can't insert all tenant_users in one transaction because each lives in its own virtual tenant database
            session.commit()
        
    except SQLAlchemyError as e:
        logger.error(f"Error adding user to tenants : {e}")

    return Token(access_token=access_token, token_type="bearer")

# We are returning both token and cookie, so the JWT can be used in both the frontend and backend
@web_app.post("/api/login")
async def login(login_data: LoginData, response: Response, session = Depends(get_global_session)):
    user: User = authenticated_user(email, password, session)
    if not user:
        logger.warn(f"Login failed for user: {email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    access_token = create_access_token(user)
    response.set_cookie(key="access_token", value=access_token)
    response.set_cookie(key="user_data", value=jsonable_encoder(user))
    return Token(access_token=access_token, token_type="bearer")

@web_app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
	exc_str = f'{exc}'.replace('\n', ' ').replace('   ', ' ')
	logging.error(f"{request}: {exc_str}")
	content = {'status_code': 10422, 'message': exc_str, 'data': None}
	return JSONResponse(content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
            
# TODO: Social login handler  
    
@app.function(secrets=[modal.Secret.from_name("database_url")])
@modal.asgi_app()
def fastapi_app():
    return web_app