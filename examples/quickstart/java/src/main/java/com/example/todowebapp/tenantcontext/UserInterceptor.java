package com.example.todowebapp.tenantcontext;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

@Component
public class UserInterceptor implements HandlerInterceptor {
    @Value("${app.require-userid}")
    private boolean isUserRequired;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        UUID userId = getUserId(request.getHeader("Authorization"));
        ThreadLocalContext.setUser(userId);
        // abort early on missing user info
        System.out.println("user Id: " + userId + ", required? " + isUserRequired);
        if (userId == null && isUserRequired) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "User required but is missing");
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // intentionally do nothing, we don't need to do anything after the request handler was invoked
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // reset the tenant ID, so it won't leak into subsequent requests
        ThreadLocalContext.setUser(null);
    }

    // Note that we are not using Spring Security because it adds a lot of complexity and Nile provides the validation we need
    // But getting the basic auth user is a bit hacky without it
    // Hack courtesy of: https://stackoverflow.com/questions/16000517/how-to-get-password-from-http-basic-authentication
    // TODO: Spring Security example
    private UUID getUserId(String authorization) {
        if (authorization != null && authorization.toLowerCase().startsWith("basic")) {
            String base64Credentials = authorization.substring("Basic".length()).trim();
            byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
            String credentials = new String(credDecoded, StandardCharsets.UTF_8);
            // credentials = username:password
            final String[] values = credentials.split(":", 2);
            return UUID.fromString(values[0]);
        }
        return null;
    }
}
