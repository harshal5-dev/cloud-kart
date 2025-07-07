package com.cloudkart.product_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class MaxImageCountException extends RuntimeException {
  public MaxImageCountException(String message) {
    super(message);
  }
}
