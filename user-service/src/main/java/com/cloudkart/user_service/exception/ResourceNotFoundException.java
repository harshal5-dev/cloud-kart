package com.cloudkart.user_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
  public ResourceNotFoundException(String message, String fieldName, String fieldValue) {
    super(
        "%s not found with the given input data %s: %s".formatted(message, fieldName, fieldValue));
  }
}
