package com.cloudkart.product_service.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

  @Bean
  public GroupedOpenApi publicApi() {
    return GroupedOpenApi.builder().group("public")
        .pathsToMatch("/api/v1/products/**", "/api/v1/categories/**").build();
  }

  @Bean
  public GroupedOpenApi adminApi() {
    return GroupedOpenApi.builder().group("admin").pathsToMatch("/api/v1/admin/**").build();
  }
}
