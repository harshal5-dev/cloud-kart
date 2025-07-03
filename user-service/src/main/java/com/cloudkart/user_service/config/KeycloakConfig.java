package com.cloudkart.user_service.config;

import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakConfig {

  @Value("${keycloak.auth-server-url}")
  private String keycloakServerUrl;

  @Value("${keycloak.realm}")
  private String realm;

  @Value("${keycloak.client-id}")
  private String clientId;

  @Value("${keycloak.client-secret}")
  private String clientSecret;

  @Bean
  Keycloak keycloakAdmin() {
    return KeycloakBuilder.builder().serverUrl(keycloakServerUrl).realm(realm)
        .grantType(OAuth2Constants.CLIENT_CREDENTIALS).clientId(clientId).clientSecret(clientSecret)
        .scope("openid profile email").build();
  }

  @Bean
  RealmResource realmResource(Keycloak keycloak) {
    return keycloak.realm(realm);
  }
}
