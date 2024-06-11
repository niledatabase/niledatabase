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
        "tenants/<uuid:tenant_id>/todos/<uuid:pk>/",
        views.ItemUpdate.as_view(),
        name="item-update",
    ),
]

