package com.cloudkart.product_service.controller.v1;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cloudkart.product_service.constants.CategoryConstants;
import com.cloudkart.product_service.dto.CategoryResDto;
import com.cloudkart.product_service.dto.ErrorResponseDto;
import com.cloudkart.product_service.dto.ProductResDto;
import com.cloudkart.product_service.dto.ResponseDto;
import com.cloudkart.product_service.service.IPublicCategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;

@Tag(name = "Public REST APIs for Category in Cloud Kart",
    description = "REST APIs in Cloud kart to FETCH category details.")
@RestController
@RequestMapping(path = "/api/v1/categories", produces = {MediaType.APPLICATION_JSON_VALUE})
public class PublicCategoryController {

  private final IPublicCategoryService iPublicCategoryService;

  public PublicCategoryController(IPublicCategoryService iPublicCategoryService) {
    this.iPublicCategoryService = iPublicCategoryService;
  }

  @Operation(summary = "Fetch Categories Details REST API",
      description = "REST API to fetch all Categories")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(
              array = @ArraySchema(schema = @Schema(implementation = CategoryResDto.class)))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping
  public ResponseEntity<ResponseDto<List<CategoryResDto>>> fetchAllCategories() {
    List<CategoryResDto> categories = iPublicCategoryService.fetchAllCategories();
    ResponseDto<List<CategoryResDto>> responseDto =
        new ResponseDto<>(HttpStatus.OK, categories, CategoryConstants.MESSAGE_FETCHED);
    return ResponseEntity.status(HttpStatus.OK).body(responseDto);
  }


  @Operation(summary = "Fetch Products Details REST API",
      description = "REST API to fetch all Products by Category slug")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(
              array = @ArraySchema(schema = @Schema(implementation = ProductResDto.class)))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/{slug}/products")
  public ResponseEntity<ResponseDto<List<ProductResDto>>> fetchProductsByCategorySlug(
      @PathVariable @NotNull(message = "slug cannot be null or empty") String slug) {
    List<ProductResDto> products = iPublicCategoryService.fetchProductsByCategorySlug(slug);
    ResponseDto<List<ProductResDto>> responseDto =
        new ResponseDto<>(HttpStatus.OK, products, CategoryConstants.MESSAGE_FETCHED);
    return ResponseEntity.status(HttpStatus.OK).body(responseDto);
  }

}
