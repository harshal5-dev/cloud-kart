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

  private String accessToken;
  private String refreshToken;
  private long expiresIn;
  private long refreshExpiresIn;

}
