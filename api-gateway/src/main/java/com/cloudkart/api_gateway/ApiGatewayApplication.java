package com.cloudkart.api_gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

	@Bean
	public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
		return builder.routes()

				// Business API Routes
				// .route("product-catalog-service",
				// r -> r.path("/api/v1/products/**", "/api/v1/categories/**", "/api/v1/admin/products/**",
				// "/api/v1/admin/categories/**").uri("lb://PRODUCT-CATALOG-SERVICE"))

				// Swagger API docs route
				// .route("product-catalog-docs", r -> r.path("/v3/api-docs/product-catalog/public")
				// .filters(
				// f -> f.rewritePath("/v3/api-docs/product-catalog/public", "/v3/api-docs/public"))
				// .uri("lb://PRODUCT-CATALOG-SERVICE"))

				.route("user-service",
						r -> r.path("/api/v1/auth/**", "/api/v1/users/**", "/api/v1/admin/users/**")
								.uri("lb://USER-SERVICE"))

				// Swagger API docs route
				.route("user-service-docs",
						r -> r.path("/v3/api-docs/user-service/public")
								.filters(
										f -> f.rewritePath("/v3/api-docs/user-service/public", "/v3/api-docs/public"))
								.uri("lb://USER-SERVICE"))

				.build();
	}
}
