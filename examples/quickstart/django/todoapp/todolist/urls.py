from django.urls import path
from . import views

urlpatterns = [
    path("", views.ListTenantsView.as_view(), name="index"),
    path("tenants/<uuid:tenant_id>/",views.ItemListView.as_view(), name="todos"),
]

