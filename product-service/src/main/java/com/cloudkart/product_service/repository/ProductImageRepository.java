package com.cloudkart.product_service.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cloudkart.product_service.entity.ProductImage;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
  List<ProductImage> findByProductSku(String productSku);

  long countByProduct_Id(Long productId);
}
