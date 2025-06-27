package com.cloudkart.user_service.util;

import java.util.Set;
import org.springframework.security.core.Authentication;

public interface ICommonUtil {

  String extractKeycloakUserId(Authentication authentication);

  Set<String> extractUserRoles(Authentication authentication);

  String generatePassword(int length);
}
