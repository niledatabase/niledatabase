from django.db import connection

class NileTenantMiddleware(object):
    def __init__ (self, get_response):
        self.get_response = get_response
        
    def __call__ (self, request):
        tenant_id = request.path_info.split('/')[2]
        if tenant_id:
            with connection.cursor() as cursor:
                cursor.execute(f'SET nile.tenant_id=\'{tenant_id}\'')

        response = self.get_response(request)
        return response