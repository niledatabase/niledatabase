from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import (
    ListView,     
    CreateView,
    UpdateView,
    DeleteView)
from ..models import Tenants

class TenantsListView(ListView):
    model = Tenants
    template_name = "todolist/index.html"

class TenantCreate(CreateView):
    model = Tenants
    fields = ["name"]

    def get_context_data(self):
        context = super(TenantCreate, self).get_context_data()
        context["name"] = "Create a new tenant"
        return context