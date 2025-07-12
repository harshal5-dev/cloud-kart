package com.cloudkart.product_service.controller.v1;

import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.cloudkart.product_service.dto.ErrorResponseDto;
import com.cloudkart.product_service.dto.PagedResDto;
import com.cloudkart.product_service.dto.ProductResDto;
import com.cloudkart.product_service.service.IPublicProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Product Search & Filter APIs",
    description = "Advanced search and filtering APIs for products")
@RestController
@RequestMapping(path = "/api/v1/search", produces = {MediaType.APPLICATION_JSON_VALUE})
@RequiredArgsConstructor
public class ProductSearchController {

  private final IPublicProductService publicProductService;

  @Operation(summary = "Advanced Product Search REST API",
      description = "Advanced search with multiple filters, sorting, and pagination")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema(implementation = PagedResDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/products")
  public ResponseEntity<PagedResDto<ProductResDto>> searchProducts(
      @RequestParam(required = false) String query, @RequestParam(required = false) String category,
      @RequestParam(required = false) String brand, @RequestParam(required = false) Double minPrice,
      @RequestParam(required = false) Double maxPrice,
      @RequestParam(required = false) Double minRating,
      @RequestParam(required = false) Boolean inStock,
      @RequestParam(required = false) Boolean featured, @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "12") int size,
      @RequestParam(defaultValue = "title") String sortBy,
      @RequestParam(defaultValue = "asc") String sortDir) {

    PagedResDto<ProductResDto> products = publicProductService.searchProducts(category, query,
        brand, minPrice, maxPrice, page, size, sortBy, sortDir);
    return ResponseEntity.ok(products);
  }

  @Operation(summary = "Get Featured Products REST API",
      description = "REST API to fetch featured products")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(
              array = @ArraySchema(schema = @Schema(implementation = ProductResDto.class)))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/featured")
  public ResponseEntity<List<ProductResDto>> getFeaturedProducts(
      @RequestParam(defaultValue = "8") int limit) {
    List<ProductResDto> featuredProducts =
        publicProductService.getLandingPageProducts("featured", limit);
    return ResponseEntity.ok(featuredProducts);
  }

  @Operation(summary = "Get New Arrivals REST API",
      description = "REST API to fetch new arrival products")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(
              array = @ArraySchema(schema = @Schema(implementation = ProductResDto.class)))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/new-arrivals")
  public ResponseEntity<List<ProductResDto>> getNewArrivals(
      @RequestParam(defaultValue = "8") int limit) {
    List<ProductResDto> newProducts =
        publicProductService.getLandingPageProducts("new-arrivals", limit);
    return ResponseEntity.ok(newProducts);
  }

  @Operation(summary = "Get Best Sellers REST API",
      description = "REST API to fetch best selling products")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(
              array = @ArraySchema(schema = @Schema(implementation = ProductResDto.class)))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/best-sellers")
  public ResponseEntity<List<ProductResDto>> getBestSellers(
      @RequestParam(defaultValue = "8") int limit) {
    List<ProductResDto> bestSellers =
        publicProductService.getLandingPageProducts("best-sellers", limit);
    return ResponseEntity.ok(bestSellers);
  }
}
