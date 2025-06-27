package com.cloudkart.user_service.config;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
public class KeycloakRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

  private static final Logger log = org.slf4j.LoggerFactory.getLogger(KeycloakRoleConverter.class);

  @Override
  public Collection<GrantedAuthority> convert(@NonNull Jwt jwt) {
    try {
      Map<String, Object> realmAccess = jwt.getClaim("realm_access");
      if (realmAccess == null) {
        return Collections.emptyList();
      }

      Object rolesObject = realmAccess.get("roles");
      if (rolesObject instanceof Collection<?> roleCollection) {
        return roleCollection.stream().filter(String.class::isInstance).map(String.class::cast)
            .map(role -> "ROLE_" + role.toUpperCase()).map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());
      }
      return Collections.emptyList();
    } catch (Exception e) {
      log.warn("Failed to convert JWT roles to authorities", e);
      return Collections.emptyList();
    }
  }
}
