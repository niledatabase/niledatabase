package com.example.todowebapp.tenantcontext;

import org.springframework.ui.ModelMap;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.request.WebRequestInterceptor;

import java.util.Map;
import java.util.UUID;
import com.example.todowebapp.tenantcontext.ThreadLocalContext;
import org.springframework.web.servlet.HandlerMapping;

public class TenantInterceptor implements WebRequestInterceptor {

    @Override
    public void preHandle(WebRequest request) throws Exception {
        // Implement your logic to extract the Tenant ID here. 
        // I'm getting it from the path parameters. 
        // Another way would be to parse a JWT and extract the Tenant ID from the Claims in the Token. 
        // Or to use a header like `X-TenantID`
        Map pathVariables = (Map) request.getAttribute(
                HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE,
                RequestAttributes.SCOPE_REQUEST);
        String tenantParam = (String) pathVariables.get("tenant_id");
        UUID tenantId = UUID.fromString(tenantParam);
        ThreadLocalContext.setTenantID(tenantId);
    }

    @Override
    public void postHandle(WebRequest request, ModelMap model) throws Exception {
        // intentionally do nothing, we don't need to do anything after the request handler was invoked
    }

    @Override
    public void afterCompletion(WebRequest request, Exception ex) throws Exception {
        // reset the tenant ID, so it won't leak into subsequent requests
        ThreadLocalContext.setTenantID(null);
    }
}