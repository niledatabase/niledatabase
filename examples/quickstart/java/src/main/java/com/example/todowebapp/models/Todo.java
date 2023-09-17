package com.example.todowebapp.models;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.FetchType;

@Entity(name = "todos") // Map this class to a table named "todos"
public class Todo {
    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;

    private String title;

    private Boolean complete;

    public UUID getId() {
        return id;
    }

    // We are not interested in returning the entire tenant object, just the id
    public UUID getTenant() {
        return tenant.getId();
    }

    public String getTitle() {
        return title;
    }

    public Boolean getComplete() {
        return complete;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setComplete(Boolean complete) {
        this.complete = complete;
    }
}
