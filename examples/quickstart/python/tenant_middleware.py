from contextvars import ContextVar
from uuid import UUID
from starlette.datastructures import Headers
from starlette.requests import Request
import logging
from auth import get_user_id_from_valid_token

logger = logging.getLogger(__name__)
tenant_id: ContextVar[str] = ContextVar("tenant_id", default=None)
user_id: ContextVar[str] = ContextVar("user_id", default=None)
# This middleware extracts the tenant ID from the request headers 
# validates that its a UUID and sets it as a context variable.
# if the tenant ID doesn't exist or is invalid, it sets the context variable to None.
class TenantAwareMiddleware:
    def __init__(self, app):
        self.app = app
        
    async def __call__(self, scope, receive, send):
        headers = Headers(scope=scope)
        maybe_tenant_id = headers.get("X-Tenant-Id")
        maybe_set_context(maybe_tenant_id, tenant_id)
        request = Request(scope)
        token = request.cookies.get("access_token")
        maybe_user_id = get_user_id_from_valid_token(token)
        logger.debug(f"Maybe user ID: {maybe_user_id}")
        maybe_set_context(maybe_user_id, user_id)
        logger.debug(f"Tenant ID: {tenant_id.get()}, User ID: {user_id.get()}")
        await self.app(scope, receive, send)


def maybe_set_context(value, context_var):
    try:
        context_var.set(UUID(str(value)))
    except ValueError:
        context_var.set(None)
        
def get_tenant_id():
    return tenant_id.get()

def get_user_id():
    return user_id.get()