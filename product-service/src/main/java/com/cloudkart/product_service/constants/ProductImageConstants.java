package com.cloudkart.product_service.constants;

public final class ProductImageConstants {

  public static final String MESSAGE_FETCHED = "Product image fetched successfully";
  public static final String MESSAGE_CREATED = "Product image created successfully";
  public static final String MESSAGE_UPDATED = "Product image updated successfully";
  public static final String MESSAGE_DELETED = "Product image deleted successfully";
  public static final int MAX_IMAGE_COUNT = 5;
  public static final String MAX_IMAGE_MSS =
      "Maximum number of images allowed is " + MAX_IMAGE_COUNT;

  private ProductImageConstants() {
    // Prevent instantiation
  }
}
