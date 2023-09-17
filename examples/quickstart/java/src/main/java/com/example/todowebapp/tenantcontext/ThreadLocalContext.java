package com.example.todowebapp.tenantcontext;

import java.util.Optional;
import java.util.UUID;

public class ThreadLocalContext {

    private static ThreadLocal<Optional<UUID>> tenant = ThreadLocal.withInitial(Optional::empty);

    public static void setTenantID(UUID tenantID) {
        tenant.set(Optional.ofNullable(tenantID));
    }

    public static Optional<UUID> getTenantID() {
        return tenant.get();
    }
}