package com.cloudkart.product_service.service;

import java.util.List;
import com.cloudkart.product_service.dto.ProductReviewCreateDto;
import com.cloudkart.product_service.dto.ProductReviewDto;

public interface IProductReviewService {

  /**
   * Submits a new product review
   *
   * @param reviewDto the review data
   * @return the ID of the created review
   */
  Long submitReview(ProductReviewCreateDto reviewDto);

  /**
   * Approves a product review (Admin only)
   *
   * @param reviewId the ID of the review to approve
   */
  void approveReview(Long reviewId);

  /**
   * Rejects a product review (Admin only)
   *
   * @param reviewId the ID of the review to reject
   */
  void rejectReview(Long reviewId);

  /**
   * Gets all pending reviews (Admin only)
   *
   * @return list of pending reviews
   */
  List<ProductReviewDto> getPendingReviews();

  /**
   * Gets reviews by product ID
   *
   * @param productId the product ID
   * @param approvedOnly whether to return only approved reviews
   * @return list of reviews
   */
  List<ProductReviewDto> getReviewsByProductId(Long productId, boolean approvedOnly);
}
