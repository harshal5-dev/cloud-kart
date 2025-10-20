package com.cloudkart.user_service.dto;

import java.util.Set;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "UserDto", description = "Schema to represent user details in the system")
public class UserDto {

  @Schema(description = "Unique identifier for the user", example = "12345")
  private Long id;

  @Schema(description = "Keycloak ID of the user", example = "12346789-89ab-cdef-0123-456789abcdef")
  private String keycloakId;

  @Schema(description = "Username of the user", example = "johndoe")
  private String username;

  @Schema(description = "Email address of the user", example = "johndoe@example.com")
  private String email;

  @Schema(description = "First name of the user", example = "John")
  private String firstName;

  @Schema(description = "Last name of the user", example = "Doe")
  private String lastName;

  @Schema(description = "Phone number of the user", example = "+1234567890")
  private String phoneNumber;

  @Schema(description = "Profile picture URL of the user",
      example = "http://example.com/profile.jpg")
  private String profilePictureUrl;

  @Schema(description = "Status of the user", example = "ACTIVE")
  private String status;

  @Schema(description = "Roles assigned to the user", example = "USER, MANAGER, ADMIN")
  private Set<String> roles;

}
