package com.cloudkart.product_service.dto;

import java.util.UUID;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "Product Image", description = "Schema to hold Product Image information")
public class ProductImageDto {

  @Schema(description = "Unique identifier for the product image",
      example = "123e4567-e89b-12d3-a456-426614174000")
  private UUID id;

  @Schema(description = "Product image name in Cloud kart shop",
      example = "apple-iphone-14-pro-max-front.jpg")
  @NotEmpty(message = "image URL cannot be null or empty")
  private String imageUrl;

  @Schema(description = "Alternative text for the image, used for accessibility",
      example = "Apple iPhone 14 Pro Max")
  private String altText;

  @Schema(description = "Sort order for the image in the product gallery", example = "0",
      type = "integer", format = "int32")
  @NotNull(message = "sort order cannot be null")
  private Integer sortOrder = 0;

  @Schema(description = "Indicates if the image is the primary image for the product",
      example = "true", type = "boolean")
  private Boolean isPrimary = false;

  @Schema(description = "Product SKU associated with the image", example = "IPHONE-14-PRO-MAX")
  @NotEmpty(message = "product SKU cannot be null or empty")
  private String productSku;
}
