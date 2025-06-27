package com.cloudkart.product_service.dto;

import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.http.HttpStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "ErrorResponse", description = "Schema to hold error response information")
public class ErrorResponseDto {

  @Schema(description = "API path invoked by client")
  private String apiPath;

  @Schema(description = "Error code representing the error happened")
  private HttpStatus errorCode;

  @Schema(description = "Error message representing the error happened")
  private String errorMessage;

  @Schema(description = "Time representing when the error happened")
  private LocalDateTime errorTime;

  @Schema(description = "Validation errors if any, in case of validation errors")
  private Map<String, String> validationErrors;

  public ErrorResponseDto(String apiPath, HttpStatus errorCode, String errorMessage) {
    this.apiPath = apiPath;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.errorTime = LocalDateTime.now();
  }

  public ErrorResponseDto(String apiPath, HttpStatus errorCode, String errorMessage,
      Map<String, String> validationErrors) {
    this.apiPath = apiPath;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.errorTime = LocalDateTime.now();
    this.validationErrors = validationErrors;
  }
}
