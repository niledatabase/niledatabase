package com.example.todowebapp.repositories;

import java.util.UUID;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.todowebapp.models.Todo;

// This will be AUTO IMPLEMENTED by Spring into a Bean called todoRepository
// CRUD refers Create, Read, Update, Delete
// UUID is the type of the primary key
public interface TodoRepository extends JpaRepository<Todo, UUID> {

    List<Todo> findByTenantId(UUID tenantId);

}
