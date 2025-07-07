package com.cloudkart.product_service.controller.v1;

import java.util.List;

import com.cloudkart.product_service.dto.CreateDataDto;
import lombok.RequiredArgsConstructor;
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
import com.cloudkart.product_service.constants.CategoryConstants;
import com.cloudkart.product_service.dto.CategoryDto;
import com.cloudkart.product_service.dto.ErrorResponseDto;
import com.cloudkart.product_service.dto.ResponseDto;
import com.cloudkart.product_service.service.ICategoryService;
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

@Tag(name = "Admin CRUD REST APIs for Category in Cloud Kart",
    description = "CRUD REST APIs in Cloud kart to CREATE, READ, UPDATE and DELETE category details.")
@RestController
@RequestMapping(path = "/api/v1/admin/categories", produces = {MediaType.APPLICATION_JSON_VALUE})
@Validated
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
public class AdminCategoryController {

  private final ICategoryService iCategoryService;

  @Operation(summary = "Create Category REST API",
      description = "REST API to create new Category inside Cloud Kart")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "HTTP Status CREATED",
          content = @Content(schema = @Schema(implementation = ResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @PostMapping
  public ResponseEntity<ResponseDto<CategoryDto>> createCategory(
      @Valid @RequestBody CategoryDto categoryDto) {
    CategoryDto createdCategory = iCategoryService.createCategory(categoryDto);

    return ResponseEntity.status(HttpStatus.CREATED).body(
        new ResponseDto<>(HttpStatus.CREATED, createdCategory, CategoryConstants.MESSAGE_CREATED));
  }

  @Operation(summary = "Fetch Category Details REST API",
      description = "REST API to fetch Category details based on a slug")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema(implementation = CategoryDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/{slug}")
  public ResponseEntity<ResponseDto<CategoryDto>> fetchCategory(
      @PathVariable @NotNull(message = "slug cannot be null or empty") String slug) {
    CategoryDto fetchedCategory = iCategoryService.fetchCategory(slug);

    return ResponseEntity.status(HttpStatus.OK)
        .body(new ResponseDto<>(HttpStatus.OK, fetchedCategory, CategoryConstants.MESSAGE_FETCHED));
  }

  @Operation(summary = "Fetch Categories Details REST API",
      description = "REST API to fetch all Categories")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(
              array = @ArraySchema(schema = @Schema(implementation = CategoryDto.class)))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping
  public ResponseEntity<ResponseDto<List<CategoryDto>>> fetchAllCategories() {
    List<CategoryDto> fetchedCategories = iCategoryService.fetchCategories();

    return ResponseEntity.status(HttpStatus.OK).body(
        new ResponseDto<>(HttpStatus.OK, fetchedCategories, CategoryConstants.MESSAGE_FETCHED));
  }

  @Operation(summary = "Update Category Details REST API",
      description = "REST API to update Category details based on a slug")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema(implementation = CategoryDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @PutMapping("/{slug}")
  public ResponseEntity<ResponseDto<CategoryDto>> updateCategory(
      @PathVariable @NotNull(message = "slug cannot be null or empty") String slug,
      @Valid @RequestBody CategoryDto categoryDto) {
    CategoryDto updatedCategory = iCategoryService.updateCategory(slug, categoryDto);

    return ResponseEntity.status(HttpStatus.OK)
        .body(new ResponseDto<>(HttpStatus.OK, updatedCategory, CategoryConstants.MESSAGE_UPDATED));
  }

  @Operation(summary = "Delete Category Details REST API",
      description = "REST API to delete Category details based on a slug")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema())),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @DeleteMapping("/{slug}")
  public ResponseEntity<ResponseDto<Void>> deleteCategory(
      @PathVariable @NotNull(message = "slug cannot be null or empty") String slug) {
    iCategoryService.deleteCategory(slug);

    return ResponseEntity.status(HttpStatus.OK)
        .body(new ResponseDto<>(HttpStatus.OK, null, CategoryConstants.MESSAGE_DELETED));
  }

  @Operation(summary = "Count Categories REST API",
      description = "REST API to count the total number of categories")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(schema = @Schema(implementation = Long.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/count")
  public ResponseEntity<ResponseDto<Long>> countCategories() {
    long count = iCategoryService.countCategories();
    return ResponseEntity.status(HttpStatus.OK)
        .body(new ResponseDto<>(HttpStatus.OK, count, CategoryConstants.MESSAGE_COUNTED));
  }

  @Operation(summary = "Create Sample Categories REST API",
      description = "REST API to create sample categories for testing purposes")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "HTTP Status CREATED",
          content = @Content(schema = @Schema(implementation = ResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @PostMapping("/create-sample-categories")
  public ResponseEntity<ResponseDto<Void>> createSampleCategories(@RequestBody CreateDataDto createDataDto) {
    iCategoryService.createSampleCategories(createDataDto);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(new ResponseDto<>(HttpStatus.CREATED, null, CategoryConstants.MESSAGE_CREATED));
  }

}
