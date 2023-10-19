package com.example.todowebapp.models;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

@Entity(name = "tenants") // Map this class to a table named "tenants"
public class Tenant {
	@Id
	private UUID id;
	private String name;

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	// This allows me to support both "normal" cases where ID is auto-generated
	// and the demo where the ID is provided for better copy-paste experience
	@PrePersist
	public void ensureIdAssigned() {
		if (id == null) {
			id = UUID.randomUUID();
		}
	}
}
