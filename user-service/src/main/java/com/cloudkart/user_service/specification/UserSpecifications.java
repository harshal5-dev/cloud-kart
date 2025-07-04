package com.cloudkart.user_service.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import com.cloudkart.user_service.entity.User;

public final class UserSpecifications {

  public static Specification<User> keycloakIdNotEqual(String keycloakId) {
    return (root, query, cb) -> cb.notEqual(root.get("keycloakId"), keycloakId);
  }

  public static Specification<User> containsTextInNameOrEmail(String text) {
    if (!StringUtils.hasText(text)) {
      return null;
    }
    return (root, query, cb) -> cb.or(
        cb.like(cb.lower(root.get("username")), "%" + text.toLowerCase() + "%"),
        cb.like(cb.lower(root.get("email")), "%" + text.toLowerCase() + "%"),
        cb.like(cb.lower(root.get("firstName")), "%" + text.toLowerCase() + "%"),
        cb.like(cb.lower(root.get("lastName")), "%" + text.toLowerCase() + "%"));
  }
}
