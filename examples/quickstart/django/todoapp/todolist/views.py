from django.shortcuts import render
from django.views.generic import ListView
from .models import Tenants, ToDoItem

# Create your views here.
class ListTenantsView(ListView):
    model = Tenants
    template_name = "todolist/index.html"

class ItemListView(ListView):
    model = ToDoItem
    template_name = "todolist/todos.html"
    
#TODO: use Nile context instead of filtering by tenant_id
    def get_queryset(self):
        qs = ToDoItem.objects.all()
        print(qs.query)
        return qs

    def get_context_data(self):
        context = super().get_context_data()
        context["todos"] = Tenants.objects.all()
        print(context)
        return context