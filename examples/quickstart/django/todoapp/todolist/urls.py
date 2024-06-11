from django.urls import path
from . import views

urlpatterns = [
    path("", views.TenantsListView.as_view(), name="index"),
    path("tenants/<uuid:tenant_id>/",views.ItemListView.as_view(), name="todos"),
    # CRUD patterns for tenants
    path("tenants/add/", views.TenantCreate.as_view(), name="tenant-add"),
    # CRUD patterns for ToDoItems
    path(
        "tenants/<uuid:tenant_id>/todos/add/",
        views.ItemCreate.as_view(),
        name="item-add",
    ),
    path(
        "tenants/<uuid:tenant_id>/todos/<uuid:pk>/", # this is the item id, we have to call this "pk" because that is what Django expects
        views.ItemUpdate.as_view(),
        name="item-update",
    ),
    path(
        "tenants/<uuid:tenant_id>/item/<uuid:pk>/delete/",
        views.ItemDelete.as_view(),
        name="item-delete",
    ),
]

