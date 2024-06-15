from django.urls import path
from .views import tenant_views, todoitem_views, auth_views

urlpatterns = [
    path("", tenant_views.TenantsListView.as_view(), name="index"),
    path('login/', auth_views.nile_login, name='login'),
    path('signup/', auth_views.signup, name='signup'),
    path('logout/', auth_views.nile_logout, name='logout'),
    path("tenants/<uuid:tenant_id>/",todoitem_views.ItemView.as_view(), name="todos"),
    path("tenants/add/", tenant_views.TenantCreate.as_view(), name="tenant-add"),
    
]

