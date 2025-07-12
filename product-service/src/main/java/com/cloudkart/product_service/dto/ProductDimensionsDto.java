package com.cloudkart.product_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "ProductDimensions", description = "Schema to represent product dimensions")
public class ProductDimensionsDto {

  @Schema(description = "Product width", example = "10.5")
  private Double width;

  @Schema(description = "Product height", example = "15.2")
  private Double height;

  @Schema(description = "Product depth", example = "8.3")
  private Double depth;
}
