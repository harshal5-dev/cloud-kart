package com.cloudkart.user_auth_service.exception;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import com.cloudkart.user_auth_service.dto.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
      @NonNull MethodArgumentNotValidException ex, @NonNull HttpHeaders headers,
      @NonNull HttpStatusCode status, @NonNull WebRequest request) {
    Map<String, String> validationErrors = new HashMap<>();
    List<ObjectError> errors = ex.getBindingResult().getAllErrors();

    errors.forEach((error) -> {
      String fieldName = ((FieldError) error).getField();
      String validationMsg = error.getDefaultMessage();
      validationErrors.put(fieldName, validationMsg);
    });
    ErrorResponse errorResponse = new ErrorResponse(request.getDescription(false),
        HttpStatus.BAD_REQUEST, "Validation failed for one or more fields", validationErrors);

    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleResourceNotFoundException(
      ResourceNotFoundException exception, WebRequest webRequest) {
    ErrorResponse errorResponse = new ErrorResponse(webRequest.getDescription(false),
        HttpStatus.NOT_FOUND, exception.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
  }


  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
      IllegalArgumentException exception, WebRequest webRequest) {
    ErrorResponse errorResponse = new ErrorResponse(webRequest.getDescription(false),
        HttpStatus.BAD_REQUEST, exception.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(MaxAddressCountException.class)
  public ResponseEntity<ErrorResponse> handleMaxAddressCountException(
      MaxAddressCountException exception, WebRequest webRequest) {
    ErrorResponse errorResponse = new ErrorResponse(webRequest.getDescription(false),
        HttpStatus.BAD_REQUEST, exception.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException exception,
      WebRequest webRequest) {
    ErrorResponse errorResponse = new ErrorResponse(webRequest.getDescription(false),
        HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleGlobalException(Exception exception,
      WebRequest webRequest) {
    ErrorResponse errorResponse = new ErrorResponse(webRequest.getDescription(false),
        HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
