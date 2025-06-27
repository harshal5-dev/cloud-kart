package com.cloudkart.user_service.exception;

import lombok.Getter;

@Getter
public class KeycloakPasswordResetException extends Exception {
  private final int statusCode;

  public KeycloakPasswordResetException(String message, int statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
