package com.cloudkart.user_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "AddressReqDto",
    description = "Schema to represent user address request details in the system")
public class AddressReqDto {

  @Schema(description = "Unique identifier for the user associated with this address",
      example = "12345")
  private Long userId;

  @Schema(description = "Type of address, e.g., HOME, OFFICE, BILLING, SHIPPING", example = "HOME",
      allowableValues = "HOME, OFFICE, BILLING, SHIPPING")
  @NotEmpty(message = "Address type is required")
  @Pattern(regexp = "^(HOME|OFFICE|BILLING|SHIPPING)$",
      message = "Address type should be one of HOME, OFFICE, BILLING, SHIPPING")
  private String addressType;

  @Schema(description = "Street address of the user", example = "123 Main St, Apt 4B")
  @NotEmpty(message = "Street address is required")
  private String streetAddress;

  @Schema(description = "City of the user", example = "Springfield")
  @NotEmpty(message = "City is required")
  private String city;

  @Schema(description = "State of the user", example = "Illinois")
  @NotEmpty(message = "State is required")
  private String state;

  @Schema(description = "Postal code of the user", example = "62704")
  @NotEmpty(message = "Postal code is required")
  @Pattern(regexp = "^[0-9]{5,10}$", message = "Postal code should be valid")
  private String postalCode;

  @Schema(description = "Country of the user", example = "USA")
  @NotEmpty(message = "Country is required")
  private String country;

  @Schema(description = "Phone number of the user", example = "+1234567890")
  @Pattern(regexp = "^[+]?[0-9\\-() ]{7,20}$",
      message = "Phone number should be valid and may include '+', digits, spaces, dashes, and parentheses")
  private String phoneNumber;

  @Schema(description = "Status of the address", example = "ACTIVE")
  private String status = "ACTIVE";

  @Schema(description = "Indicates if this address is the default address for the user",
      example = "true")
  private Boolean isDefault;
}
