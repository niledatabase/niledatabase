from django.urls import path
from .views import tenant_views, todoitem_views, auth_views

urlpatterns = [
    path("", tenant_views.TenantsListView.as_view(), name="index"),
    path('login/', auth_views.nile_login, name='login'),
    path('signup/', auth_views.signup, name='signup'),
    path("tenants/<uuid:tenant_id>/",todoitem_views.ItemListView.as_view(), name="todos"),
    # CRUD patterns for tenants
    path("tenants/add/", tenant_views.TenantCreate.as_view(), name="tenant-add"),
    # CRUD patterns for ToDoItems
    path(
        "tenants/<uuid:tenant_id>/todos/add/",
        todoitem_views.ItemCreate.as_view(),
        name="item-add",
    ),
    path(
        "tenants/<uuid:tenant_id>/todos/<uuid:pk>/", # this is the item id, we have to call this "pk" because that is what Django expects
        todoitem_views.ItemUpdate.as_view(),
        name="item-update",
    ),
    path(
        "tenants/<uuid:tenant_id>/item/<uuid:pk>/delete/",
        todoitem_views.ItemDelete.as_view(),
        name="item-delete",
    ),
]

