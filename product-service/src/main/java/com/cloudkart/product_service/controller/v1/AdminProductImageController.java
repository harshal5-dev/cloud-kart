package com.cloudkart.product_service.controller.v1;

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
import com.cloudkart.product_service.constants.ProductImageConstants;
import com.cloudkart.product_service.dto.ErrorResponseDto;
import com.cloudkart.product_service.dto.ProductImageDto;
import com.cloudkart.product_service.dto.ResponseDto;
import com.cloudkart.product_service.service.IProductImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@Tag(name = "Admin CRUD REST APIs for Product Image in Cloud Kart",
    description = "CRUD REST APIs in Cloud kart to CREATE, READ, UPDATE and DELETE product image details.")
@RestController
@RequestMapping(path = "/api/v1/admin/products/{sku}/images",
    produces = {MediaType.APPLICATION_JSON_VALUE})
@Validated
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
public class AdminProductImageController {

  private final IProductImageService iProductImageService;


  @Operation(summary = "Fetch Product Images Details REST API",
      description = "REST API to fetch Product images details based on a product SKU")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(
              array = @ArraySchema(schema = @Schema(implementation = ProductImageDto.class)))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping
  public ResponseEntity<ResponseDto<List<ProductImageDto>>> fetchAllProductImages(
      @PathVariable @NotNull(message = "product sku cannot be null or empty") String sku) {
    List<ProductImageDto> productImages = iProductImageService.fetchProductImages(sku);
    ResponseDto<List<ProductImageDto>> responseDto =
        new ResponseDto<>(HttpStatus.OK, productImages, ProductImageConstants.MESSAGE_FETCHED);
    return ResponseEntity.status(HttpStatus.OK).body(responseDto);
  }

  @Operation(summary = "Create Product Image REST API",
      description = "REST API to create new Product Image inside product")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "HTTP Status CREATED",
          content = @Content(schema = @Schema(implementation = ProductImageDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @PostMapping
  public ResponseEntity<ResponseDto<ProductImageDto>> createProductImage(
      @PathVariable @NotNull(message = "product sku cannot be null or empty") String sku,
      @Valid @RequestBody ProductImageDto productImageDto) {
    ProductImageDto createdProductImage =
        iProductImageService.createProductImage(sku, productImageDto);
    ResponseDto<ProductImageDto> responseDto = new ResponseDto<>(HttpStatus.CREATED,
        createdProductImage, ProductImageConstants.MESSAGE_CREATED);
    return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
  }

  @Operation(summary = "Update Product Image Details REST API",
      description = "REST API to update Product Image details based on a id")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema(implementation = ProductImageDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @PutMapping("/{id}")
  public ResponseEntity<ResponseDto<ProductImageDto>> updateProductImage(
      @PathVariable @NotNull(message = "product sku cannot be null or empty") String sku,
      @PathVariable @NotNull(message = "id cannot be null or empty") Long id,
      @Valid @RequestBody ProductImageDto productImageDto) {
    ProductImageDto updatedProductImage =
        iProductImageService.updateProductImage(sku, id, productImageDto);
    ResponseDto<ProductImageDto> responseDto = new ResponseDto<>(HttpStatus.OK, updatedProductImage,
        ProductImageConstants.MESSAGE_UPDATED);
    return ResponseEntity.status(HttpStatus.OK).body(responseDto);
  }

  @Operation(summary = "Delete Product Image Details REST API",
      description = "REST API to delete Product Image details based on a id")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema())),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @DeleteMapping("/{id}")
  public ResponseEntity<ResponseDto<Void>> deleteProductImage(
      @PathVariable @NotNull(message = "product sku cannot be null or empty") String sku,
      @PathVariable @NotNull(message = "id cannot be null or empty") Long id) {
    iProductImageService.deleteProductImage(sku, id);
    ResponseDto<Void> responseDto =
        new ResponseDto<>(HttpStatus.OK, null, ProductImageConstants.MESSAGE_DELETED);
    return ResponseEntity.status(HttpStatus.OK).body(responseDto);
  }
}
