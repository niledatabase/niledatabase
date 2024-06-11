from django.db import connection

class NileTenantMiddleware(object):
    def __init__ (self, get_response):
        self.get_response = get_response
        
    def __is_tenants_url (self, path_params):
        return len(path_params) > 2 and path_params[1] == 'tenants' and path_params[2] != 'add'
        
    def __call__ (self, request):
        path_params = request.path_info.split('/')
        if self.__is_tenants_url(path_params):
            tenant_id = path_params[2]
            with connection.cursor() as cursor:
                cursor.execute(f'SET nile.tenant_id=\'{tenant_id}\'')

        response = self.get_response(request)
        return response