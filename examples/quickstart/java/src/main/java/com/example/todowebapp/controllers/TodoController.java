package com.example.todowebapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.todowebapp.models.Todo;
import com.example.todowebapp.repositories.TenantRepository;
import com.example.todowebapp.repositories.TodoRepository;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.UUID;

@Controller
@RequestMapping(path="/tenants/{tenant_id}/todos", produces = {"application/json"})
public class TodoController {
    @Autowired
    private TodoRepository todoRepository;
    @Autowired
    private TenantRepository tenantRepository;

    // add todos for a tenant
    @PostMapping
    @ResponseBody
    public Todo addNewTodo (@RequestBody Todo todo, @PathVariable UUID tenant_id) {
        todo.setTenant(tenantRepository.getReferenceById(tenant_id));
        todoRepository.save(todo);
        return todo;
    }

    // list all todos for a tenant
    @GetMapping
    public @ResponseBody Iterable<Todo> getAllTodos() {
        // Because we use a tenant-aware data source, this operation is safe
        // It will only return results for the tenant in the request
        // We can use the built-in `findAll` and don't need to create a custom `findByTenantId` method for every Entity
        return todoRepository.findAll();
    }
}
