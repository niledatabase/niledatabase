
create table services (
    tenant_id uuid not null,
    name varchar(64) not null, -- we use name as a unique identifier
    description text not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    primary key (tenant_id, name)
);

-- Dependencies between services
-- service_id depends on dependency_id
create table service_dependencies (
    tenant_id uuid not null,
    service_name varchar(64) not null,
    dependency_name varchar(64) not null,
    foreign key (tenant_id, service_name) references services(tenant_id, name),
    foreign key (tenant_id, dependency_name) references services(tenant_id, name)
);

-- Number of active users logged in to the tenant's application
-- Reported by the tenant's application, every minute
create table user_activity (
    tenant_id uuid not null,
    datetime TIMESTAMP NOT NULL DEFAULT NOW(),
    num_active_users INT NOT NULL
)

-- Health status of the services
-- Reported by a monitoring agent, every minute
create table service_health (
    tenant_id uuid not null,
    datetime TIMESTAMP NOT NULL DEFAULT NOW(),
    service_name varchar(64) not null,
    status text not null, -- 'healthy', 'unhealthy'
    latency bigint not null, -- in milliseconds
    foreign key (tenant_id,service_name) references services(tenant_id,name)
);

-- Workload on the services
-- Number of requests received by the service, by response status
-- Reported by service, every minute
create table service_workload (
    tenant_id uuid not null,
    datetime TIMESTAMP NOT NULL DEFAULT NOW(),
    service_id uuid not null,
    num_requests INT NOT NULL,
    response_status INT NOT NULL,
    avg_resp_time double not null, -- in milliseconds
    99tile_resp_time double not null, -- in milliseconds
    foreign key (service_id) references services(id)
);

--- TBD: Save postmortems with embeddings
--- TBD: Additional data: Logs, customer conversations, team slack messages.
