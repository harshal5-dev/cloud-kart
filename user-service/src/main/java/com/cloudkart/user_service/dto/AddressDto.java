package com.cloudkart.user_service.dto;

import com.cloudkart.user_service.entity.AddressType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "AddressDto", description = "Schema to represent user address details in the system")
public class AddressDto {

  @Schema(description = "Unique identifier for the address", example = "12345")
  private Long id;

  @Schema(description = "Unique identifier for the user associated with this address",
      example = "12345")
  private Long userId;

  @Schema(description = "Type of address, e.g., HOME, OFFICE, BILLING, SHIPPING", example = "HOME")
  private AddressType addressType;

  @Schema(description = "Street address of the user", example = "123 Main St, Apt 4B")
  private String streetAddress;

  @Schema(description = "City of the user", example = "Springfield")
  private String city;

  @Schema(description = "State of the user", example = "Illinois")
  private String state;

  @Schema(description = "Postal code of the user", example = "62704")
  private String postalCode;

  @Schema(description = "Country of the user", example = "USA")
  private String country;

  @Schema(description = "Phone number of the user", example = "+1234567890")
  private String phoneNumber;

  @Schema(description = "Status of the address", example = "ACTIVE")
  private String status;

  @Schema(description = "Indicates if this address is the default address for the user",
      example = "true")
  private Boolean isDefault;
}
