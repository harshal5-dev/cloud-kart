package com.cloudkart.product_service.dto;

import java.time.LocalDateTime;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "ProductReview", description = "Schema to represent product review")
public class ProductReviewDto {

  @Schema(description = "Review rating", example = "5")
  private int rating;

  @Schema(description = "Review comment", example = "Great product!")
  private String comment;

  @Schema(description = "Review date", example = "2023-01-01T10:00:00")
  private LocalDateTime date;

  @Schema(description = "Reviewer name", example = "John Doe")
  private String reviewerName;

  @Schema(description = "Reviewer email", example = "john@example.com")
  private String reviewerEmail;
}
