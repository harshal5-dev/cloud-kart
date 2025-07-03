package com.cloudkart.user_service.dto;

import java.util.Set;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "CreateUserDto",
    description = "Schema to represent user creation details in the system")
public class CreateUserDto {

  @Schema(description = "Username of the user", example = "example123", required = true)
  @NotEmpty(message = "Username is required")
  @Pattern(regexp = "^[a-zA-Z0-9._%+-]{3,}$",
      message = "Username should be at least 3 characters long and can contain letters, numbers, dots, underscores, and hyphens")
  private String username;

  @Schema(description = "Email of the user", example = "your-email@example.com")
  @NotEmpty(message = "Email is required")
  @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      message = "Email should be valid")
  private String email;

  @Schema(description = "First name of the user", example = "John", required = true)
  @NotEmpty(message = "First name is required")
  private String firstName;

  @Schema(description = "Last name of the user", example = "Doe")
  private String lastName;

  @Schema(description = "Phone number of the user", example = "+1234567890", required = true)
  @NotEmpty(message = "Phone number is required")
  @Pattern(regexp = "^[+]?[0-9\\-() ]{7,20}$",
      message = "Phone number should be valid and may include '+', digits, spaces, dashes, and parentheses")
  private String phoneNumber;

  @Schema(description = "Roles assigned to the user", example = "USER, MANAGER, ADMIN")
  @NotEmpty(message = "At least one role is required")
  private Set<String> roles = Set.of("USER");
}
