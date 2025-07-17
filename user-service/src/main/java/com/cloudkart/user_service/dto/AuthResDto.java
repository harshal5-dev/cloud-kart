package com.cloudkart.user_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Schema(name = "AuthResDto", description = "Schema to represent authentication response details")
public class AuthResDto {

  @Schema(description = "Type of the access token", example = "Bearer")
  private String accessToken;

  @Schema(description = "Type of the refresh token", example = "Bearer")
  private String refreshToken;

  @Schema(description = "Expiration time of the access token in seconds", example = "3600")
  private long expiresIn;

  @Schema(description = "Expiration time of the refresh token in seconds", example = "86400")
  private long refreshExpiresIn;

}
