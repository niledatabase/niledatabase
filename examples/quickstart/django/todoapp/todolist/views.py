from django.shortcuts import render
from django.urls import reverse
from django.views.generic import (
    ListView,     
    CreateView,
    UpdateView,)
from .models import Tenants, ToDoItem

# Create your views here.
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

class ItemListView(ListView):
    model = ToDoItem
    template_name = "todolist/todos.html"
    
    def get_queryset(self):
        qs = ToDoItem.objects.all()
        print(qs.query)
        return qs

    def get_context_data(self):
        context = super().get_context_data()
        tenants = Tenants.objects.all() # because we are in a tenant context, we know this is just one tenant
        context["tenant"] = tenants[0]
        return context
    
class ItemCreate(CreateView):
    model = ToDoItem
    fields = [
        "tenant", # this is a hidden field, we will set it in get_initial
        "title",
        "description",
        "due_date",
    ]

    def get_initial(self):
        initial_data = super(ItemCreate, self).get_initial()
        tenants = Tenants.objects.all() # because we are in a tenant context, we know this is just one tenant
        initial_data["tenant"] = tenants[0]
        return initial_data

    def get_context_data(self):
        context = super(ItemCreate, self).get_context_data()
        tenants = Tenants.objects.all() # because we are in a tenant context, we know this is just one tenant
        context["tenant"] = tenants[0]
        context["title"] = "Create a new todo task"
        return context
    
    def get_form(self, form_class=None):
        form = super().get_form(form_class)
        field = form.fields['tenant']
        field.widget = field.hidden_widget()
        return form

    def get_success_url(self):
        return reverse("todos", args=[self.object.tenant_id])
    
class ItemUpdate(UpdateView):
    model = ToDoItem
    fields = [
        "tenant",
        "title",
        "description",
        "due_date",
    ]

    def get_context_data(self):
        context = super(ItemUpdate, self).get_context_data()
        context["tenant"] = self.object.tenant
        context["title"] = "Edit item"
        return context
    
    def get_form(self, form_class=None):
        form = super().get_form(form_class)
        field = form.fields['tenant']
        field.widget = field.hidden_widget()
        return form

    def get_success_url(self):
        return reverse("todos", args=[self.object.tenant_id])