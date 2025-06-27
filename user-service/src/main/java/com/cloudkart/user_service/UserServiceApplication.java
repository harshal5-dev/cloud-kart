package com.cloudkart.user_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@SpringBootApplication
@EnableJpaAuditing
@OpenAPIDefinition(
		info = @Info(title = "User Profile microservice REST API documentation", version = "v1",
				description = "Cloud Kart User microservice REST API documentation",
				contact = @Contact(name = "Harshal Ganbote", url = "Cloud Kart",
						email = "harshalganbote55@gmail.com"),
				license = @License(name = "Apache 2.0", url = "Cloud Kart")),
		// security = {@SecurityRequirement(name = "bearerAuth")},
		externalDocs = @ExternalDocumentation(
				description = "Cloud Kart User microservice REST API Documentation",
				url = "https://www.cloudkart.com/swagger-ui.html"))
@SecurityScheme(name = "bearerAuth", type = SecuritySchemeType.HTTP, scheme = "bearer",
		bearerFormat = "JWT")
public class UserServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserServiceApplication.class, args);
	}

}
