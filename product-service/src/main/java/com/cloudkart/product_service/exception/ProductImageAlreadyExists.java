package com.cloudkart.product_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ProductImageAlreadyExists extends RuntimeException {
  public ProductImageAlreadyExists(String message) {
    super(message);
  }
}
