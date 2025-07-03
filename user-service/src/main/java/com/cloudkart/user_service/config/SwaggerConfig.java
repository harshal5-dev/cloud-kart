package com.cloudkart.user_service.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

  @Bean
  GroupedOpenApi publicApi() {
    return GroupedOpenApi.builder().group("public")
        .pathsToMatch("/api/v1/auth/**", "/api/v1/users/**").build();
  }

  @Bean
  GroupedOpenApi adminApi() {
    return GroupedOpenApi.builder().group("admin").pathsToMatch("/api/v1/admin/**").build();
  }
}
