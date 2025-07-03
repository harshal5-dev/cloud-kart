package com.cloudkart.user_service.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.time.Instant;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException authException) throws IOException, ServletException {
    response.setContentType("application/json;charset=UTF-8");
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    String json = String.format(
        "{\"errorCode\":401,\"errorMessage\":\"Authentication failed: %s\",\"errorTime\":\"%s\",\"apiPath\":\"%s\"}",
        authException.getMessage(), Instant.now().toString(), request.getRequestURI());
    response.getWriter().write(json);
  }
}
