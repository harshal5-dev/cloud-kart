package com.cloudkart.product_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "Product Image", description = "Schema to hold Product Image information")
public class ProductImageDto {

  @Schema(description = "Unique identifier for the product image", example = "12345")
  private Long id;

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

  @Schema(description = "Product SKU associated with the image", example = "IPHONE-14-PRO-MAX")
  @NotEmpty(message = "product SKU cannot be null or empty")
  private String productSku;
}
