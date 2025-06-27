package com.cloudkart.product_service.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import com.cloudkart.product_service.entity.Product;

@Repository
public interface ProductRepository
    extends JpaRepository<Product, UUID>, JpaSpecificationExecutor<Product> {
  Optional<Product> findBySku(String sku);

  boolean existsBySkuAndIdNot(String sku, UUID id);

  List<Product> findTop8ByFeaturedTrueOrderByCreatedAtDesc();

  List<Product> findTop8ByOrderByCreatedAtDesc();

  List<Product> findTop8ByOrderByTotalSalesDesc();
}
