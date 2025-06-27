package com.cloudkart.product_service.dto;

import java.util.ArrayList;
import java.util.List;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "Product Response", description = "Schema to hold Product information")
public class ProductResDto {

  @Schema(description = "Product title in Cloud kart shop", example = "Apple iPhone 14 Pro Max")
  private String title;

  @Schema(description = "category slug in Cloud kart shop", example = "electronics")
  private String categorySlug;

  @Schema(description = "category name in Cloud kart shop", example = "Electronics")
  private String categoryName;

  @Schema(description = "description about a product",
      example = "Latest Apple iPhone with A16 Bionic chip")
  private String description;

  @Schema(description = "price of a product", example = "1199.99", type = "number",
      format = "double")
  private Double price;

  @Schema(description = "available stock for the product", example = "50", type = "integer",
      format = "int32")
  private Integer stock;

  @Schema(description = "brand of the product", example = "Apple")
  private String brand;

  @Schema(description = "unique identifier for the product", example = "TSHIRT-M-BLK")
  private String sku;

  @Schema(description = "featured status of the product", example = "true")
  private boolean featured;

  @Schema(description = "total sales of the product", example = "1500")
  private int totalSales;

  @Schema(description = "list of product images")
  List<ProductImageResDto> productImages = new ArrayList<>();
}
