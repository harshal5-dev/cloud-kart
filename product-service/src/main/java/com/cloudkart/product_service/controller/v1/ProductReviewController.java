package com.cloudkart.product_service.controller.v1;

import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cloudkart.product_service.dto.ErrorResponseDto;
import com.cloudkart.product_service.dto.ProductReviewCreateDto;
import com.cloudkart.product_service.dto.ResponseDto;
import com.cloudkart.product_service.service.IProductReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "Product Review REST APIs", description = "REST APIs for managing product reviews")
@RestController
@RequestMapping(path = "/api/v1/reviews", produces = {MediaType.APPLICATION_JSON_VALUE})
@Validated
@RequiredArgsConstructor
public class ProductReviewController {

  private final IProductReviewService productReviewService;

  @Operation(summary = "Submit Product Review REST API",
      description = "REST API to submit a new product review")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "Review submitted successfully",
          content = @Content(schema = @Schema(implementation = ResponseDto.class))),
      @ApiResponse(responseCode = "400", description = "Invalid input",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "404", description = "Product not found",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @PostMapping
  public ResponseEntity<ResponseDto<String>> submitReview(
      @Valid @RequestBody ProductReviewCreateDto reviewDto) {
    UUID reviewId = productReviewService.submitReview(reviewDto);
    ResponseDto<String> responseDto = new ResponseDto<>(HttpStatus.CREATED, reviewId.toString(),
        "Review submitted successfully and is pending approval");
    return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
  }
}
