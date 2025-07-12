package com.cloudkart.product_service.dto;

import java.util.List;
import java.util.UUID;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "ProductDetailResponse",
    description = "Schema to represent detailed product information with images and reviews")
public class ProductDetailResponseDto {

  @Schema(description = "Product ID", example = "123e4567-e89b-12d3-a456-426614174000")
  private UUID id;

  @Schema(description = "Product title", example = "iPhone 14 Pro")
  private String title;

  @Schema(description = "Product description",
      example = "Latest Apple smartphone with A16 Bionic chip")
  private String description;

  @Schema(description = "Product category", example = "electronics")
  private String category;

  @Schema(description = "Product price", example = "999.99")
  private Double price;

  @Schema(description = "Discount percentage", example = "10.0")
  private Double discountPercentage;

  @Schema(description = "Average rating", example = "4.5")
  private Double rating;

  @Schema(description = "Stock quantity", example = "67")
  private Integer stock;

  @Schema(description = "Product brand", example = "Apple")
  private String brand;

  @Schema(description = "Product SKU", example = "SKU101")
  private String sku;

  @Schema(description = "Product weight", example = "0.5")
  private Double weight;

  @Schema(description = "Product dimensions")
  private ProductDimensionsDto dimensions;

  @Schema(description = "Warranty information", example = "1 year manufacturer warranty")
  private String warrantyInformation;

  @Schema(description = "Shipping information", example = "Free shipping on orders over $50")
  private String shippingInformation;

  @Schema(description = "Availability status", example = "IN_STOCK")
  private String availabilityStatus;

  @Schema(description = "Return policy", example = "30-day return policy")
  private String returnPolicy;

  @Schema(description = "Minimum order quantity", example = "1")
  private Integer minimumOrderQuantity;

  @Schema(description = "Product thumbnail URL", example = "https://example.com/thumbnail.jpg")
  private String thumbnail;

  @Schema(description = "List of product image URLs")
  private List<String> images;

  @Schema(description = "List of product reviews")
  private List<ProductReviewDto> reviews;
}
