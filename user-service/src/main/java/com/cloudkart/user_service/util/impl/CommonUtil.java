package com.cloudkart.user_service.util.impl;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import com.cloudkart.user_service.util.ICommonUtil;


@Component
public class CommonUtil implements ICommonUtil {
  private final SecureRandom RANDOM = new SecureRandom();

  @Override
  public String extractKeycloakUserId(Authentication authentication) {
    if (authentication instanceof JwtAuthenticationToken jwtToken) {
      return jwtToken.getToken().getClaimAsString("sub");
    }
    throw new IllegalArgumentException("Invalid authentication token");
  }

  @Override
  public Set<String> extractUserRoles(Authentication authentication) {
    if (authentication instanceof JwtAuthenticationToken jwtToken) {
      return jwtToken.getAuthorities().stream().map(GrantedAuthority::getAuthority)
          .collect(Collectors.toSet());
    }
    throw new IllegalArgumentException("Invalid authentication token");
  }

  @Override
  public String generatePassword(int length) {
    byte[] randomBytes = new byte[length];
    RANDOM.nextBytes(randomBytes);
    return Base64.getEncoder().encodeToString(randomBytes).substring(0, length);
  }
}
