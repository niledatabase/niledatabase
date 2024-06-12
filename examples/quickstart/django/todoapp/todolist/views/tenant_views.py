from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import (
    ListView,     
    CreateView)
from ..models import Tenants, TenantUsers, Users

class TenantsListView(ListView):
    model = Tenants
    template_name = "todolist/index.html"
    
    def get_queryset(self):
        qs = Tenants.objects.filter(users__id=self.request.user.id)
        print(qs.query)
        return qs

class TenantCreate(CreateView):
    model = Tenants
    fields = ["name"]

    def get_context_data(self):
        context = super(TenantCreate, self).get_context_data()
        context["name"] = "Create a new tenant"
        return context
    
    def form_valid(self, form):
        obj = form.save(commit=False)
        obj.save()        
        tenant_user = TenantUsers(tenant=obj, user=Users.objects.get(pk=self.request.user.id), created=obj.created, updated=obj.updated)
        tenant_user.save()
        return super(TenantCreate, self).form_valid(form)