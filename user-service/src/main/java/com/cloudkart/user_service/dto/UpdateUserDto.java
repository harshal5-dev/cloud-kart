package com.cloudkart.user_service.dto;

import java.util.Set;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "UpdateUserDto",
    description = "Schema to represent user update request details in the system")
public class UpdateUserDto {

  @Schema(description = "First name of the user", example = "John", required = true)
  @NotEmpty(message = "First name is required")
  private String firstName;

  @Schema(description = "Last name of the user", example = "Doe")
  private String lastName;

  @Schema(description = "Profile picture URL of the user",
      example = "http://example.com/profile.jpg")
  private String profilePictureUrl;

  @Schema(description = "Roles assigned to the user", example = "USER, MANAGER, ADMIN")
  @NotEmpty(message = "At least one role is required")
  private Set<String> roles = Set.of("USER");

  @Schema(description = "Status of the user", example = "ACTIVE")
  private String status = "ACTIVE";

  @Schema(description = "Phone number of the user", example = "+1234567890", required = true)
  @NotEmpty(message = "Phone number is required")
  @Pattern(regexp = "^[+]?[0-9\\-() ]{7,20}$",
      message = "Phone number should be valid and may include '+', digits, spaces, dashes, and parentheses")
  private String phoneNumber;
}
