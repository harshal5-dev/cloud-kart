package com.cloudkart.product_service.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.cloudkart.product_service.dto.ProductReviewCreateDto;
import com.cloudkart.product_service.dto.ProductReviewDto;
import com.cloudkart.product_service.entity.Product;
import com.cloudkart.product_service.entity.ProductReview;
import com.cloudkart.product_service.exception.ResourceNotFoundException;
import com.cloudkart.product_service.repository.ProductRepository;
import com.cloudkart.product_service.repository.ProductReviewRepository;
import com.cloudkart.product_service.service.IProductReviewService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductReviewService implements IProductReviewService {

  private final ProductReviewRepository productReviewRepository;
  private final ProductRepository productRepository;

  @Override
  public UUID submitReview(ProductReviewCreateDto reviewDto) {
    // Verify product exists
    Product product = productRepository.findById(reviewDto.getProductId()).orElseThrow(
        () -> new ResourceNotFoundException("Product", "ID", reviewDto.getProductId().toString()));

    // Create new review
    ProductReview review = new ProductReview();
    review.setProduct(product);
    review.setRating(reviewDto.getRating());
    review.setComment(reviewDto.getComment());
    review.setReviewerName(reviewDto.getReviewerName());
    review.setReviewerEmail(reviewDto.getReviewerEmail());
    review.setReviewDate(LocalDateTime.now());
    review.setApproved(false); // Reviews need approval

    ProductReview savedReview = productReviewRepository.save(review);
    return savedReview.getId();
  }

  @Override
  public void approveReview(UUID reviewId) {
    ProductReview review = productReviewRepository.findById(reviewId)
        .orElseThrow(() -> new ResourceNotFoundException("Review", "ID", reviewId.toString()));

    review.setApproved(true);
    productReviewRepository.save(review);

    // Update product average rating
    updateProductRating(review.getProduct().getId());
  }

  @Override
  public void rejectReview(UUID reviewId) {
    ProductReview review = productReviewRepository.findById(reviewId)
        .orElseThrow(() -> new ResourceNotFoundException("Review", "ID", reviewId.toString()));

    productReviewRepository.delete(review);
  }

  @Override
  @Transactional(readOnly = true)
  public List<ProductReviewDto> getPendingReviews() {
    List<ProductReview> pendingReviews = productReviewRepository.findByApprovedFalse();
    return pendingReviews.stream().map(this::mapToDto).collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public List<ProductReviewDto> getReviewsByProductId(UUID productId, boolean approvedOnly) {
    List<ProductReview> reviews;
    if (approvedOnly) {
      reviews =
          productReviewRepository.findByProductIdAndApprovedTrueOrderByReviewDateDesc(productId);
    } else {
      reviews = productReviewRepository.findByProductIdOrderByReviewDateDesc(productId);
    }

    return reviews.stream().map(this::mapToDto).collect(Collectors.toList());
  }

  private void updateProductRating(UUID productId) {
    List<ProductReview> approvedReviews =
        productReviewRepository.findByProductIdAndApprovedTrue(productId);

    if (!approvedReviews.isEmpty()) {
      double averageRating =
          approvedReviews.stream().mapToInt(ProductReview::getRating).average().orElse(0.0);

      Product product = productRepository.findById(productId)
          .orElseThrow(() -> new ResourceNotFoundException("Product", "ID", productId.toString()));

      product.setAverageRating(averageRating);
      product.setTotalReviews(approvedReviews.size());
      productRepository.save(product);
    }
  }

  private ProductReviewDto mapToDto(ProductReview review) {
    ProductReviewDto dto = new ProductReviewDto();
    dto.setRating(review.getRating());
    dto.setComment(review.getComment());
    dto.setDate(review.getReviewDate());
    dto.setReviewerName(review.getReviewerName());
    dto.setReviewerEmail(review.getReviewerEmail());
    return dto;
  }
}
