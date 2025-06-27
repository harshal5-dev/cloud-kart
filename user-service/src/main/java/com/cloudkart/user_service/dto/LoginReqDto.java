package com.cloudkart.user_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "LoginReqDto",
    description = "Schema to represent user login request details in the system")
public class LoginReqDto {

  @Schema(description = "Username or email of the user", example = "example123", required = true)
  @NotEmpty(message = "Username is required")
  @Pattern(regexp = "^[a-zA-Z0-9._%+-]{3,}$",
      message = "Username should be at least 3 characters long and can contain letters, numbers, dots, underscores, and hyphens")
  private String username;

  @Schema(description = "Password of the user", example = "password123", required = true)
  @NotEmpty(message = "Password is required")
  private String password;
}
