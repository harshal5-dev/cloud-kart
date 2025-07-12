package com.cloudkart.product_service.controller.v1;

import java.util.List;
import java.util.UUID;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cloudkart.product_service.dto.ErrorResponseDto;
import com.cloudkart.product_service.dto.ProductDetailResponseDto;
import com.cloudkart.product_service.dto.ProductReviewDto;
import com.cloudkart.product_service.service.IProductDetailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Product Details REST APIs",
    description = "REST APIs for detailed product information including images and reviews")
@RestController
@RequestMapping(path = "/api/v1/products", produces = {MediaType.APPLICATION_JSON_VALUE})
@RequiredArgsConstructor
public class ProductDetailController {

  private final IProductDetailService productDetailService;

  @Operation(summary = "Get Product Details REST API",
      description = "REST API to fetch detailed product information including images and reviews")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema(implementation = ProductDetailResponseDto.class))),
      @ApiResponse(responseCode = "404", description = "Product not found",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/{productId}/details")
  public ResponseEntity<ProductDetailResponseDto> getProductDetails(@PathVariable UUID productId) {
    ProductDetailResponseDto productDetails = productDetailService.getProductDetails(productId);
    return ResponseEntity.ok(productDetails);
  }

  @Operation(summary = "Get Product Reviews REST API",
      description = "REST API to fetch all approved reviews for a product")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(
              array = @ArraySchema(schema = @Schema(implementation = ProductReviewDto.class)))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/{productId}/reviews")
  public ResponseEntity<List<ProductReviewDto>> getProductReviews(@PathVariable UUID productId) {
    List<ProductReviewDto> reviews = productDetailService.getProductReviews(productId);
    return ResponseEntity.ok(reviews);
  }

  @Operation(summary = "Get Product Images REST API",
      description = "REST API to fetch all images for a product")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(
              array = @ArraySchema(schema = @Schema(implementation = String.class)))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/{productId}/images")
  public ResponseEntity<List<String>> getProductImages(@PathVariable UUID productId) {
    List<String> images = productDetailService.getProductImages(productId);
    return ResponseEntity.ok(images);
  }
}
