package com.cloudkart.product_service.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cloudkart.product_service.entity.Product;

@Repository
public interface ProductDetailRepository extends JpaRepository<Product, UUID> {

  @Query(value = """
      SELECT
          p.id as id,
          p.title as title,
          p.description as description,
          c.name as category,
          p.price as price,
          p.discounted_price as discountPercentage,
          p.average_rating as rating,
          p.stock as stock,
          p.brand as brand,
          p.sku as sku,
          p.weight as weight,
          p.width as width,
          p.height as height,
          p.depth as depth,
          p.warranty_details as warrantyInformation,
          p.shipping_information as shippingInformation,
          p.availability_status as availabilityStatus,
          p.return_policy as returnPolicy,
          p.minimum_order_quantity as minimumOrderQuantity,
          p.thumbnail as thumbnail
      FROM product p
      LEFT JOIN category c ON p.category_id = c.id
      WHERE p.id = :productId
      AND p.availability_status != 'DISCONTINUED'
      """, nativeQuery = true)
  Optional<Object[]> findProductDetailById(@Param("productId") UUID productId);

  @Query(value = """
      SELECT image_url
      FROM product_images
      WHERE product_id = :productId
      ORDER BY sort_order
      """, nativeQuery = true)
  List<String> findProductImages(@Param("productId") UUID productId);

  @Query(value = """
      SELECT
          rating,
          comment,
          review_date as date,
          reviewer_name as reviewerName,
          reviewer_email as reviewerEmail
      FROM product_reviews
      WHERE product_id = :productId
      AND approved = true
      ORDER BY review_date DESC
      """, nativeQuery = true)
  List<Object[]> findApprovedProductReviews(@Param("productId") UUID productId);
}
