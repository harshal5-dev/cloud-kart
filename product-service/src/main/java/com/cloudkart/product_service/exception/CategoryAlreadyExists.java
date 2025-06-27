package com.cloudkart.product_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class CategoryAlreadyExists extends RuntimeException {
  public CategoryAlreadyExists(String message) {
    super(message);
  }
}
