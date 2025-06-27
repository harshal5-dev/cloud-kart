package com.cloudkart.product_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "Product", description = "Schema to hold Product information")
public class ProductDto {

  @Schema(description = "Product title in Cloud kart shop", example = "Apple iPhone 14 Pro Max")
  @NotEmpty(message = "product title cannot be null or empty")
  private String title;

  @Schema(description = "category slug in Cloud kart shop", example = "electronics")
  @NotEmpty(message = "category slug cannot be null or empty")
  private String categorySlug;

  @Schema(description = "description about a product",
      example = "Latest Apple iPhone with A16 Bionic chip")
  private String description;

  @Schema(description = "price of a product", example = "1199.99", type = "number",
      format = "double")
  @NotNull(message = "product price cannot be null or empty")
  @DecimalMin(value = "0.0", inclusive = false, message = "product price must be greater than 0")
  private Double price;

  @Schema(description = "available stock for the product", example = "50", type = "integer",
      format = "int32")
  @NotNull(message = "product stock cannot be null or empty")
  @Min(value = 1, message = "product stock must be at least 1")
  private Integer stock;

  @Schema(description = "brand of the product", example = "Apple")
  private String brand;

  @Schema(description = "featured status of the product", example = "true")
  private boolean featured;

  @Schema(description = "total sales of the product", example = "1500")
  private int totalSales;

  @Schema(description = "unique identifier for the product", example = "TSHIRT-M-BLK")
  private String sku;
}
