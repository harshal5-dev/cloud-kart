package com.cloudkart.user_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class MaxAddressCountException extends RuntimeException {
  public MaxAddressCountException(String message) {
    super(message);
  }
}
