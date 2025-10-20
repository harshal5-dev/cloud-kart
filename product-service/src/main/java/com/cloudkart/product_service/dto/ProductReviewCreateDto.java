package com.cloudkart.product_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "ProductReviewCreate", description = "Schema to create a new product review")
public class ProductReviewCreateDto {

  @Schema(description = "Product ID", example = "12345")
  @NotNull(message = "Product ID is required")
  private Long productId;

  @Schema(description = "Review rating (1-5)", example = "5")
  @NotNull(message = "Rating is required")
  @Min(value = 1, message = "Rating must be at least 1")
  @Max(value = 5, message = "Rating must be at most 5")
  private Integer rating;

  @Schema(description = "Review comment", example = "Great product!")
  @Size(max = 1000, message = "Comment must not exceed 1000 characters")
  private String comment;

  @Schema(description = "Reviewer name", example = "John Doe")
  @NotBlank(message = "Reviewer name is required")
  @Size(max = 100, message = "Reviewer name must not exceed 100 characters")
  private String reviewerName;

  @Schema(description = "Reviewer email", example = "john@example.com")
  @NotBlank(message = "Reviewer email is required")
  @Email(message = "Please provide a valid email address")
  @Size(max = 100, message = "Reviewer email must not exceed 100 characters")
  private String reviewerEmail;
}
