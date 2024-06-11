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
        context["todos"] = Tenants.objects.all()
        print(context)
        return context
    
class ItemCreate(CreateView):
    model = ToDoItem
    fields = [
        "tentant",
        "title",
        "description",
        "due_date",
    ]

    def get_initial(self):
        initial_data = super(ItemCreate, self).get_initial()
        tenant = Tenants.objects.get(id=self.kwargs["tenant_id"])
        initial_data["tenant"] = tenant
        return initial_data

    def get_context_data(self):
        context = super(ItemCreate, self).get_context_data()
        tenant = Tenants.objects.get(id=self.kwargs["tenant_id"])
        context["tenant"] = tenant
        context["title"] = "Create a new todo task"
        return context

    def get_success_url(self):
        return reverse("list", args=[self.object.tenant_id])
    
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
        context["todo_list"] = self.object.todo_list
        context["title"] = "Edit item"
        return context

    def get_success_url(self):
        return reverse("list", args=[self.object.todo_list_id])