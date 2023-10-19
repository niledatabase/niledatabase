package com.example.todowebapp;

import com.example.todowebapp.tenantcontext.ThreadLocalContext;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.UUID;

public class TenantAwareDataSource extends HikariDataSource {

    @Override
    public Connection getConnection() throws SQLException {
        Connection connection = super.getConnection();


        try (Statement sql = connection.createStatement()) {
            // This makes sure the connection is to this tenant's "virtual DB"
            // Any query we run on this connection will only ever return data the belongs to this tenant
            ThreadLocalContext.getTenantID().ifPresentOrElse(
                    tenantID -> setContext(sql, "SET nile.tenant_id = '" + tenantID + "'"),
                    // reset the user ID even if it was not set, Nile requires that before resetting the tenant ID
                    () -> setContext(sql, "RESET nile.user_id; RESET nile.tenant_id;")
            );
        }

        try (Statement sql = connection.createStatement()) {
            // This also sets the User ID, if it exists
            ThreadLocalContext.getUser().ifPresentOrElse(
                    userID -> setContext(sql, "SET nile.user_id = '" + userID + "'"),
                    () -> setContext(sql, "RESET nile.user_id")
            );
        }

        return connection;
    }

    private void setContext(Statement sql, String setCtx) {
        try {
            sql.execute(setCtx);
        } catch (SQLException e) {
            System.out.println("Failed to set context. Usually this happens when the tenant doesn't exist. " +
                    "Throwing the exception, as we do here, will cause the request to fail since it won't get a DB connection." +
                    "An insecure alternative is to swallow the exception and allow the request to run outside the tenant's virtual DB.");
            throw new RuntimeException(e);
        }
    }
}
