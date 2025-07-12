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

  @Schema(description = "unique identifier for the product", example = "TSHIRT-M-BLK")
  private String sku;

  @Schema(description = "discount percentage for the product", example = "10.0")
  @DecimalMin(value = "0.0", message = "discount percentage must be non-negative")
  private Double discountPercentage = 0.0;

  @Schema(description = "weight of the product in kg", example = "0.5")
  @DecimalMin(value = "0.0", message = "weight must be non-negative")
  private Double weight;

  @Schema(description = "width of the product in cm", example = "10.5")
  @DecimalMin(value = "0.0", message = "width must be non-negative")
  private Double width;

  @Schema(description = "height of the product in cm", example = "15.2")
  @DecimalMin(value = "0.0", message = "height must be non-negative")
  private Double height;

  @Schema(description = "depth of the product in cm", example = "8.3")
  @DecimalMin(value = "0.0", message = "depth must be non-negative")
  private Double depth;

  @Schema(description = "minimum order quantity for the product", example = "1")
  @Min(value = 1, message = "minimum order quantity must be at least 1")
  private Integer minimumOrderQuantity = 1;

  @Schema(description = "availability status of the product", example = "IN_STOCK")
  private String availabilityStatus = "IN_STOCK";

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
}
