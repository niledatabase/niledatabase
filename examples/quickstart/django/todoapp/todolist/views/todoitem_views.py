from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import (
    ListView,     
    CreateView,
    UpdateView,
    DeleteView)
from ..models import ToDoItem, Tenants

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
    
class ItemDelete(DeleteView):
    model = ToDoItem

    def get_success_url(self):
        # You have to use reverse_lazy() instead of reverse(),
        # as the urls are not loaded when the file is imported.
        return reverse_lazy("todos", args=[self.kwargs["tenant_id"]])

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["tenant"] = self.object.tenant
        return context