from contextvars import ContextVar
from uuid import UUID
from starlette.datastructures import Headers
from starlette.requests import Request
import logging

logger = logging.getLogger(__name__)
tenant_id: ContextVar[str] = ContextVar("tenant_id", default=None)

# This middleware extracts the tenant ID from the request headers 
# validates that its a UUID and sets it as a context variable.
# if the tenant ID doesn't exist or is invalid, it sets the context variable to None.
class TenantAwareMiddleware:
    def __init__(self, app):
        self.app = app
        
    async def __call__(self, scope, receive, send):
        try:
            headers = Headers(scope=scope)
            maybe_tenant_id = headers.get("X-Tenant-Id")
            logger.debug(f"Tenant ID: {maybe_tenant_id}")
            tenant_id.set(UUID(str(maybe_tenant_id)))
        except ValueError:
            tenant_id.set(None)
        await self.app(scope, receive, send)
        
def get_tenant_id():
    return tenant_id.get()