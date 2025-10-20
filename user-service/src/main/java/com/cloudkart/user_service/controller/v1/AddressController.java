package com.cloudkart.user_service.controller.v1;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cloudkart.user_service.dto.AddressDto;
import com.cloudkart.user_service.dto.AddressReqDto;
import com.cloudkart.user_service.dto.ErrorResponseDto;
import com.cloudkart.user_service.dto.ResponseDto;
import com.cloudkart.user_service.service.IAddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "CRUD REST Apis for Addresses in Cloud Kart",
    description = "This controller provides CRUD operations for user addresses in the Cloud Kart application.")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/users/{userId}/addresses",
    produces = {MediaType.APPLICATION_JSON_VALUE})
@Validated
@SecurityRequirement(name = "bearerAuth")
public class AddressController {
  private final IAddressService addressService;


  @Operation(summary = "Get all addresses for a user",
      description = "Fetches all addresses associated with the specified user ID.")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "HTTP Status OK"),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping
  public ResponseEntity<ResponseDto<List<AddressDto>>> getUserAddresses(@PathVariable Long userId) {
    List<AddressDto> addresses = addressService.getAddressByUserId(userId);
    ResponseDto<List<AddressDto>> response =
        new ResponseDto<>(HttpStatus.OK, addresses, "Addresses fetched successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @Operation(summary = "Get a specific address for a user",
      description = "Fetches a specific address by its ID associated with the specified user ID.")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "HTTP Status OK"),
      @ApiResponse(responseCode = "404", description = "HTTP Status Not Found",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/default")
  public ResponseEntity<ResponseDto<AddressDto>> getDefaultUserAddress(@PathVariable Long userId) {
    AddressDto defaultAddress = addressService.getDefaultUserAddress(userId);
    ResponseDto<AddressDto> response =
        new ResponseDto<>(HttpStatus.OK, defaultAddress, "Default address fetched successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @Operation(summary = "Count addresses for a user",
      description = "Counts the number of addresses associated with the specified user ID.")
  @ApiResponses({@ApiResponse(responseCode = "200", description = "HTTP Status OK"),
      @ApiResponse(responseCode = "404", description = "HTTP Status Not Found",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/count")
  public ResponseEntity<ResponseDto<Long>> countUserAddresses(@PathVariable Long userId) {
    long count = addressService.countUserAddresses(userId);
    ResponseDto<Long> response =
        new ResponseDto<>(HttpStatus.OK, count, "Address count fetched successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @Operation(summary = "Create a new address for a user",
      description = "Creates a new address associated with the specified user ID.")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "HTTP Status Created",
          content = @Content(schema = @Schema(implementation = AddressDto.class))),
      @ApiResponse(responseCode = "400", description = "HTTP Status Bad Request",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @PostMapping
  public ResponseEntity<ResponseDto<AddressDto>> createAddress(@PathVariable Long userId,
      @Valid @RequestBody AddressReqDto addressReqDto) {
    long addressCount = addressService.countUserAddresses(userId);

    if (addressCount >= 4) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto<>(
          HttpStatus.BAD_REQUEST, null, "User cannot have more than 4 addresses"));
    }

    addressReqDto.setUserId(userId);
    AddressDto createdAddress = addressService.createAddress(addressReqDto);
    ResponseDto<AddressDto> response =
        new ResponseDto<>(HttpStatus.CREATED, createdAddress, "Address created successfully");
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @Operation(summary = "Update an existing address for a user",
      description = "Updates an existing address by its ID associated with the specified user ID.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema(implementation = AddressDto.class))),
      @ApiResponse(responseCode = "404", description = "HTTP Status Not Found",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "400", description = "HTTP Status Bad Request",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @PutMapping("/{id}")
  public ResponseEntity<ResponseDto<AddressDto>> updateAddress(@PathVariable Long userId,
      @PathVariable Long id, @Valid @RequestBody AddressReqDto addressReqDto) {
    addressReqDto.setUserId(userId);
    AddressDto updatedAddress = addressService.updateAddress(id, addressReqDto);
    ResponseDto<AddressDto> response =
        new ResponseDto<>(HttpStatus.OK, updatedAddress, "Address updated successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @Operation(summary = "Delete an address for a user",
      description = "Deletes an existing address by its ID associated with the specified user ID.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema(implementation = Void.class))),
      @ApiResponse(responseCode = "404", description = "HTTP Status Not Found",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @DeleteMapping("/{id}")
  public ResponseEntity<ResponseDto<Void>> deleteAddress(@PathVariable Long userId,
      @PathVariable Long id) {
    addressService.deleteAddress(id, userId);
    ResponseDto<Void> response =
        new ResponseDto<>(HttpStatus.OK, null, "Address deleted successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
