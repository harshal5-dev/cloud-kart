package com.cloudkart.product_service.exception;

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
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import com.cloudkart.product_service.dto.ErrorResponseDto;

@ControllerAdvice
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

    ErrorResponseDto errorResponseDTO = new ErrorResponseDto(request.getDescription(false),
        HttpStatus.BAD_REQUEST, "Validation failed for one or more fields", validationErrors);

    return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(CategoryAlreadyExists.class)
  public ResponseEntity<ErrorResponseDto> handleCategoryAlreadyExistsException(
      CategoryAlreadyExists exception, WebRequest webRequest) {
    ErrorResponseDto errorResponseDTO = new ErrorResponseDto(webRequest.getDescription(false),
        HttpStatus.BAD_REQUEST, exception.getMessage());
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ErrorResponseDto> handleResourceNotFoundException(
      ResourceNotFoundException exception, WebRequest webRequest) {
    ErrorResponseDto errorResponseDTO = new ErrorResponseDto(webRequest.getDescription(false),
        HttpStatus.NOT_FOUND, exception.getMessage());
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(ProductAlreadyExists.class)
  public ResponseEntity<ErrorResponseDto> handleProductAlreadyExistsException(
      ProductAlreadyExists exception, WebRequest webRequest) {
    ErrorResponseDto errorResponseDTO = new ErrorResponseDto(webRequest.getDescription(false),
        HttpStatus.BAD_REQUEST, exception.getMessage());
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ProductImageAlreadyExists.class)
  public ResponseEntity<ErrorResponseDto> handleProductImageAlreadyExistsException(
      ProductImageAlreadyExists exception, WebRequest webRequest) {
    ErrorResponseDto errorResponseDTO = new ErrorResponseDto(webRequest.getDescription(false),
        HttpStatus.BAD_REQUEST, exception.getMessage());
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(MaxImageCountException.class)
  public ResponseEntity<ErrorResponseDto> handleMaxImageCountException(
      MaxImageCountException exception, WebRequest webRequest) {
    ErrorResponseDto errorResponseDTO = new ErrorResponseDto(webRequest.getDescription(false),
        HttpStatus.BAD_REQUEST, exception.getMessage());
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ErrorResponseDto> handleIllegalArgumentException(
      IllegalArgumentException exception, WebRequest webRequest) {
    ErrorResponseDto errorResponseDTO = new ErrorResponseDto(webRequest.getDescription(false),
        HttpStatus.BAD_REQUEST, exception.getMessage());
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ErrorResponseDto> handleRuntimeException(RuntimeException exception,
      WebRequest webRequest) {
    ErrorResponseDto errorResponseDTO = new ErrorResponseDto(webRequest.getDescription(false),
        HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponseDto> handleGlobalException(Exception exception,
      WebRequest webRequest) {
    ErrorResponseDto errorResponseDTO = new ErrorResponseDto(webRequest.getDescription(false),
        HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
