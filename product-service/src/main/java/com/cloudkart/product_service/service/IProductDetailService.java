package com.cloudkart.product_service.service;

import java.util.List;
import com.cloudkart.product_service.dto.ProductDetailResponseDto;
import com.cloudkart.product_service.dto.ProductReviewDto;

public interface IProductDetailService {

  /**
   * Fetches detailed product information including images and reviews
   *
   * @param productId the ID of the product
   * @return detailed product information
   */
  ProductDetailResponseDto getProductDetails(Long productId);

  /**
   * Fetches all approved reviews for a product
   *
   * @param productId the ID of the product
   * @return list of approved reviews
   */
  List<ProductReviewDto> getProductReviews(Long productId);

  /**
   * Fetches product images
   *
   * @param productId the ID of the product
   * @return list of image URLs
   */
  List<String> getProductImages(Long productId);
}
