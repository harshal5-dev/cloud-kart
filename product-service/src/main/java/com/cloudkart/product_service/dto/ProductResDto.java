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

  @Schema(description = "total sales count for the product", example = "1205")
  private Integer totalSales;

  @Schema(description = "average rating of the product", example = "4.5")
  private Double averageRating;

  @Schema(description = "discount percentage for the product", example = "10.0")
  private Double discountPercentage;

  @Schema(description = "weight of the product in kg", example = "0.5")
  private Double weight;

  @Schema(description = "width of the product in cm", example = "10.5")
  private Double width;

  @Schema(description = "height of the product in cm", example = "15.2")
  private Double height;

  @Schema(description = "depth of the product in cm", example = "8.3")
  private Double depth;

  @Schema(description = "minimum order quantity for the product", example = "1")
  private Integer minimumOrderQuantity;

  @Schema(description = "availability status of the product", example = "IN_STOCK")
  private String availabilityStatus;

  @Schema(description = "shipping information for the product",
      example = "Free shipping on orders over $50")
  private String shippingDetails;

  @Schema(description = "warranty details for the product",
      example = "1 year manufacturer warranty")
  private String warrantyDetails;

  @Schema(description = "return policy for the product", example = "30-day return policy")
  private String returnPolicy;

  @Schema(description = "thumbnail image URL for the product",
      example = "https://example.com/thumbnail.jpg")
  private String thumbnail;

  @Schema(description = "list of product images")
  List<ProductImageResDto> productImages = new ArrayList<>();
}
