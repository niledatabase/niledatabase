package com.example.todowebapp.controllers;

import com.example.todowebapp.models.User;
import com.example.todowebapp.tenantcontext.ThreadLocalContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.todowebapp.models.Tenant;
import com.example.todowebapp.repositories.TenantRepository;

import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collections;
import java.util.UUID;

@Controller
@RequestMapping(path="/tenants", produces = {"application/json"}) // adding endpoint for tenants
public class TenantController {
	@Autowired
	private TenantRepository tenantRepository;

	// Create new tenants
	@PostMapping 
	@ResponseBody
	public Tenant addNewTenant (@RequestBody Tenant tenant) {

		if (ThreadLocalContext.getUser().isPresent()) {
			System.out.println("trying to connect user to tenant");
			User newUser = new User();
			newUser.setId(ThreadLocalContext.getUser().get());

			tenant.setUsers(Collections.singleton(newUser));
			System.out.println("creating tenant " + tenant.getName() + " and users " + tenant.getUsers().toString());
		}
		ThreadLocalContext.setUser(null); // We don't have a tenant yet, and Nile doesn't let us set user context without it
		tenantRepository.save(tenant);
		return tenant;
	}

	// List all tenants
	@GetMapping
	public @ResponseBody Iterable<Tenant> getAllTenants() {
		if (ThreadLocalContext.getUser().isPresent()) {
			UUID userId = ThreadLocalContext.getUser().get();
			ThreadLocalContext.setUser(null);
			return tenantRepository.findByUsers_Id(userId);
		} else {
			ThreadLocalContext.setUser(null);
			return tenantRepository.findAll();
		}
	}
}
