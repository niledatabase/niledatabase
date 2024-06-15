from django.db import connection
from django.shortcuts import redirect
from django.urls import reverse

class NileTenantMiddleware(object):
    def __init__ (self, get_response):
        self.get_response = get_response
        
    def __is_tenants_url (self, path_params):
        return len(path_params) > 2 and path_params[1] == 'tenants' and path_params[2] != 'add'
    
    def _must_authenticate(self, request):
        allowed_paths = [
            reverse('login'),
            reverse('signup'),
        ]
        print(request.user)
        return not request.user.is_authenticated and request.path not in allowed_paths
        
    def __call__ (self, request):
        for key, value in request.session.items():
            print('{} => {}'.format(key, value))
        path_params = request.path_info.split('/')
        if self._must_authenticate(request):
            return redirect(reverse('login'))
        if self.__is_tenants_url(path_params):
            tenant_id = path_params[2]
            with connection.cursor() as cursor:
                cursor.execute(f'SET nile.tenant_id=\'{tenant_id}\'')
            # We are authenticated, so we have a user_id too
            # This will error if the user isn't allowed to access the tenant, which is what we want
            # Note that we are only setting user ID if tenant ID is set - this is because Nile doesn't allow otherwise
            if request.user.id is not None:
                with connection.cursor() as cursor:
                    cursor.execute(f'SET nile.user_id=\'{request.user.id}\'')

        response = self.get_response(request)
        return response