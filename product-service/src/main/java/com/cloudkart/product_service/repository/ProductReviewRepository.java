package com.cloudkart.product_service.repository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cloudkart.product_service.entity.ProductReview;

@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, UUID> {

  /**
   * Find all pending reviews (not approved)
   */
  List<ProductReview> findByApprovedFalse();

  /**
   * Find all approved reviews for a product ordered by review date descending
   */
  List<ProductReview> findByProductIdAndApprovedTrueOrderByReviewDateDesc(UUID productId);

  /**
   * Find all reviews for a product ordered by review date descending
   */
  List<ProductReview> findByProductIdOrderByReviewDateDesc(UUID productId);

  /**
   * Find all approved reviews for a product
   */
  List<ProductReview> findByProductIdAndApprovedTrue(UUID productId);
}
