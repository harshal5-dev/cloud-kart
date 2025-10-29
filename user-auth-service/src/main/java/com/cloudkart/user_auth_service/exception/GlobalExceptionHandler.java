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
import com.cloudkart.user_auth_service.dto.AppErrorResponse;

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
    AppErrorResponse errorResponse = new AppErrorResponse(request.getDescription(false),
        HttpStatus.BAD_REQUEST, "Validation failed for one or more fields", validationErrors);

    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<AppErrorResponse> handleResourceNotFoundException(
      ResourceNotFoundException exception, WebRequest webRequest) {
    AppErrorResponse errorResponse = new AppErrorResponse(webRequest.getDescription(false),
        HttpStatus.NOT_FOUND, exception.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
  }


  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<AppErrorResponse> handleIllegalArgumentException(
      IllegalArgumentException exception, WebRequest webRequest) {
    AppErrorResponse errorResponse = new AppErrorResponse(webRequest.getDescription(false),
        HttpStatus.BAD_REQUEST, exception.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(MaxAddressCountException.class)
  public ResponseEntity<AppErrorResponse> handleMaxAddressCountException(
      MaxAddressCountException exception, WebRequest webRequest) {
    AppErrorResponse errorResponse = new AppErrorResponse(webRequest.getDescription(false),
        HttpStatus.BAD_REQUEST, exception.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<AppErrorResponse> handleRuntimeException(RuntimeException exception,
      WebRequest webRequest) {
    AppErrorResponse errorResponse = new AppErrorResponse(webRequest.getDescription(false),
        HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<AppErrorResponse> handleGlobalException(Exception exception,
      WebRequest webRequest) {
    AppErrorResponse errorResponse = new AppErrorResponse(webRequest.getDescription(false),
        HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
