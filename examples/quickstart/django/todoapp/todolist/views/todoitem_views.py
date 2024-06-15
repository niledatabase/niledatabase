from django.shortcuts import render, get_object_or_404
from django.views import View
from ..models import Tenants, ToDoItem
from ..forms import TodoItemForm
from django.http import JsonResponse

class ItemView(View):
    
    def get(self, request, tenant_id):
        tenant = get_object_or_404(Tenants, id=tenant_id)
        todoitems = ToDoItem.objects.all()
        form = TodoItemForm()
        return render(request, 'todolist/todos.html', {'tenant': tenant, 'todoitems': todoitems, 'form': form})
    
    
    def post(self, request, tenant_id):
        if 'title' in request.POST:
            return self.create_todo_item(request, tenant_id)
        elif 'todo_id' in request.POST:
            return self.update_todo_item(request, tenant_id)

    def create_todo_item(self, request, tenant_id):
        tenant = get_object_or_404(Tenants, id=tenant_id)
        form = TodoItemForm(request.POST)
        if form.is_valid():
            todoitem = form.save(commit=False)
            todoitem.tenant = tenant
            todoitem.save()
            if request.accepts('application/json'):
                return JsonResponse({"message": "Success"}, status=200)
            else:
                return self.get(request, tenant_id)
        else:
            if request.accepts('application/json'):
                return JsonResponse(form.errors, status=500)
            else:
                return self.get(request, tenant_id)

    def update_todo_item(self, request, tenant_id):
        todo_id = request.POST.get('todo_id')
        completed = request.POST.get('completed') == 'true'
        todoitem = get_object_or_404(ToDoItem, id=todo_id, tenant_id=tenant_id)
        todoitem.completed = completed
        todoitem.save()
        return JsonResponse({"message": "Success"}, status=200)