package com.example.todowebapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.todowebapp.models.Tenant;
import com.example.todowebapp.repositories.TenantRepository;

import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping(path="/tenants", produces = {"application/json"}) // adding endpoint for tenants
public class TenantController {
	@Autowired
	private TenantRepository tenantRepository;

	// Create new tenants
	@PostMapping 
	@ResponseBody
	public Tenant addNewTenant (@RequestBody Tenant tenant) {

		tenantRepository.save(tenant);
		return tenant;
	}

	// List all tenants
	@GetMapping
	public @ResponseBody Iterable<Tenant> getAllTenants() {
		return tenantRepository.findAll();
	}
}
