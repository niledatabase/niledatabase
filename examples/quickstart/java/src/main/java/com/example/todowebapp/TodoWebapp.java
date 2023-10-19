package com.example.todowebapp;

import com.example.todowebapp.tenantcontext.TenantInterceptor;
import com.example.todowebapp.tenantcontext.UserInterceptor;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.sql.DataSource;

@SpringBootApplication
public class TodoWebapp {
    public static void main(String[] args) {
        SpringApplication.run(TodoWebapp.class, args);
    }

    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new TenantAwareDataSource();

        return dataSource;
    }

    @Configuration
    class CustomConfig implements WebMvcConfigurer {
        @Autowired
        private UserInterceptor userInterceptor;
        public void addInterceptors(InterceptorRegistry registry) {
            // We only apply the interceptor to URLs that have tenant_id in the path
            // This is because we rely on the path to know which tenant is making the request
            // The implication is that everyone can view all tenants, but that's fine for this demo
            registry.addWebRequestInterceptor(new TenantInterceptor()).addPathPatterns("/tenants/{tenant_id}/**");
            registry.addInterceptor(userInterceptor).excludePathPatterns("/insecure");
        }
    }
}
