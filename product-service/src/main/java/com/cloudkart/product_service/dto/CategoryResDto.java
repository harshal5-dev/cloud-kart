package com.cloudkart.product_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "Category Response", description = "Schema to hold Category information")
public class CategoryResDto {

  @Schema(description = "Category name in Cloud kart shop", example = "electronics")
  private String name;

  @Schema(description = "Category slug in Cloud kart shop", example = "mens-shoes")
  private String slug;

  @Schema(description = "Category description in Cloud kart shop", example = "electronics products")
  private String description;

  @Schema(description = "Category image URL in Cloud kart shop",
      example = "https://example.com/images/electronics.jpg")
  private String imageUrl;
}
