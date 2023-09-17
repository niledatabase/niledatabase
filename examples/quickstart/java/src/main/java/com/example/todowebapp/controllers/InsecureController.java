package com.example.todowebapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.todowebapp.models.Todo;
import com.example.todowebapp.repositories.TodoRepository;

@Controller
@RequestMapping(path="/insecure/all_todos", produces = {"application/json"})
// insecure endpoint to get all todos - don't try this in production 😅 We are making a point here.
public class InsecureController {
    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public @ResponseBody Iterable<Todo> getAllTodos() {
        return todoRepository.findAll();
    }
}
