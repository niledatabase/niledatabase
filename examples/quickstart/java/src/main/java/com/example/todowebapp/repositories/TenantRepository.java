package com.example.todowebapp.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.todowebapp.models.Tenant;

// This will be AUTO IMPLEMENTED by Spring into a Bean called tenantRepository
// CRUD refers Create, Read, Update, Delete
// UUID is the type of the primary key

public interface TenantRepository extends JpaRepository<Tenant, UUID> {

}
