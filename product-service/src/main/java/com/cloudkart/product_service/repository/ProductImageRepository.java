package com.cloudkart.product_service.repository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cloudkart.product_service.entity.ProductImage;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, UUID> {
  List<ProductImage> findByProductSku(String productSku);

  long countByProduct_Id(UUID productId);

  List<ProductImage> findByProduct_IdAndIsPrimary(UUID productId, boolean isPrimary);
}
