package com.cloudkart.product_service.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cloudkart.product_service.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
  Optional<Category> findBySlug(String slug);

  boolean existsBySlugAndIdNot(String slug, UUID id);
}
