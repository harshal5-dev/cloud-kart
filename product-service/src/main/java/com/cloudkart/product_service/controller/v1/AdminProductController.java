package com.cloudkart.product_service.controller.v1;

import org.springframework.data.domain.Page;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.cloudkart.product_service.constants.ProductConstants;
import com.cloudkart.product_service.dto.ErrorResponseDto;
import com.cloudkart.product_service.dto.ProductDto;
import com.cloudkart.product_service.dto.ProductResDto;
import com.cloudkart.product_service.dto.ResponseDto;
import com.cloudkart.product_service.service.IProductService;
import com.cloudkart.product_service.service.IPublicProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;


@Tag(name = "Admin CRUD REST APIs for Product in Cloud Kart",
    description = "CRUD REST APIs in Cloud kart to CREATE, READ, UPDATE and DELETE product details.")
@RestController
@RequestMapping(path = "/api/v1/admin/products", produces = {MediaType.APPLICATION_JSON_VALUE})
@Validated
@SecurityRequirement(name = "bearerAuth")
public class AdminProductController {

  private final IProductService iProductService;
  private final IPublicProductService iPublicProductService;

  public AdminProductController(IProductService iProductService,
      IPublicProductService iPublicProductService) {
    this.iProductService = iProductService;
    this.iPublicProductService = iPublicProductService;
  }

  @Operation(summary = "Search Products REST API",
      description = "REST API to search products with various filters like category, keyword, brand, price range, and pagination.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema(implementation = Page.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping
  public ResponseEntity<Page<ProductResDto>> getProducts(
      @RequestParam(required = false) String category,
      @RequestParam(required = false) String keyword, @RequestParam(required = false) String brand,
      @RequestParam(required = false) Double minPrice,
      @RequestParam(required = false) Double maxPrice, @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy,
      @RequestParam(defaultValue = "asc") String sortDir) {
    Page<ProductResDto> response = iPublicProductService.searchProducts(category, keyword, brand,
        minPrice, maxPrice, page, size, sortBy, sortDir);
    return ResponseEntity.ok(response);
  }

  @Operation(summary = "Create Product REST API",
      description = "REST API to create new Product inside Cloud Kart")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "HTTP Status CREATED",
          content = @Content(schema = @Schema(implementation = ProductDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @PostMapping
  public ResponseEntity<ResponseDto<ProductDto>> createProduct(
      @Valid @RequestBody ProductDto productDto) {
    ProductDto createdProduct = iProductService.createProduct(productDto);
    ResponseDto<ProductDto> responseDto =
        new ResponseDto<>(HttpStatus.CREATED, createdProduct, ProductConstants.MESSAGE_CREATED);
    return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
  }

  @Operation(summary = "Fetch Product Details REST API",
      description = "REST API to fetch Product details based on a slug")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema(implementation = ProductDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/{sku}")
  public ResponseEntity<ResponseDto<ProductDto>> fetchProduct(
      @PathVariable @NotNull(message = "sku cannot be null or empty") String sku) {
    ProductDto product = iProductService.fetchProduct(sku);
    ResponseDto<ProductDto> responseDto =
        new ResponseDto<>(HttpStatus.OK, product, ProductConstants.MESSAGE_FETCHED);
    return ResponseEntity.status(HttpStatus.OK).body(responseDto);
  }

  @Operation(summary = "Update Product Details REST API",
      description = "REST API to update Product details based on a slug")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema(implementation = ProductDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @PutMapping("/{sku}")
  public ResponseEntity<ResponseDto<ProductDto>> updateProduct(
      @PathVariable @NotNull(message = "sku cannot be null or empty") String sku,
      @Valid @RequestBody ProductDto productDto) {
    ProductDto updatedProduct = iProductService.updateProduct(sku, productDto);
    ResponseDto<ProductDto> responseDto =
        new ResponseDto<>(HttpStatus.OK, updatedProduct, ProductConstants.MESSAGE_UPDATED);
    return ResponseEntity.status(HttpStatus.OK).body(responseDto);
  }

  @Operation(summary = "Delete Product Details REST API",
      description = "REST API to delete Product details based on a slug")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema())),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @DeleteMapping("/{sku}")
  public ResponseEntity<ResponseDto<Void>> deleteProduct(
      @PathVariable @NotNull(message = "sku cannot be null or empty") String sku) {
    iProductService.deleteProduct(sku);
    ResponseDto<Void> responseDto =
        new ResponseDto<>(HttpStatus.OK, null, ProductConstants.MESSAGE_DELETED);
    return ResponseEntity.status(HttpStatus.OK).body(responseDto);
  }

  @Operation(summary = "Count Products REST API",
      description = "REST API to count total number of products")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema(implementation = Long.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/count")
  public ResponseEntity<ResponseDto<Long>> countProducts() {
    long count = iProductService.countProducts();
    ResponseDto<Long> responseDto =
        new ResponseDto<>(HttpStatus.OK, count, ProductConstants.MESSAGE_COUNTED);
    return ResponseEntity.status(HttpStatus.OK).body(responseDto);
  }
}
