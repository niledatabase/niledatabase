# myapp/auth_backends.py

import requests
from django.conf import settings
from .models import Users

class NileAuthBackend:
    def authenticate(self, request, username=None, password=None):
        response = requests.post(settings.NILEDB_API_URL+"/users/login", json={'email': username, 'password': password})
        if response.status_code == 200:
            user_data = response.json()
            # We create a user object by grabbing it from the DB, if the login call was successful, it will exist
            user = Users.objects.get(email=username, id=user_data['id'])
            print("Returning user")
            print(user)
            return user

        print(response.status_code)
        print(response.text)
        return None
    
    def get_user(self, id):
        try:
            return Users.objects.get(pk=id)
        except Users.DoesNotExist:
            return None

