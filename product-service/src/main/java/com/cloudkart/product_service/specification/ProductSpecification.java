package com.cloudkart.product_service.specification;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import com.cloudkart.product_service.entity.Product;
import jakarta.persistence.criteria.Predicate;


public final class ProductSpecification {

  public static Specification<Product> getProductsByFilters(String category, String keyword,
      String brand, Double minPrice, Double maxPrice) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();

      if (category != null && !category.isEmpty()) {
        predicates.add(cb.like(cb.lower(root.get("category").get("name")),
            "%" + category.toLowerCase() + "%"));
      }

      if (keyword != null && !keyword.isEmpty()) {
        Predicate titleLike =
            cb.like(cb.lower(root.get("title")), "%" + keyword.toLowerCase() + "%");
        Predicate descLike =
            cb.like(cb.lower(root.get("description")), "%" + keyword.toLowerCase() + "%");
        predicates.add(cb.or(titleLike, descLike));
      }

      if (brand != null && !brand.isEmpty()) {
        predicates.add(cb.equal(cb.lower(root.get("brand")), brand.toLowerCase()));
      }

      if (minPrice != null) {
        predicates.add(cb.greaterThanOrEqualTo(root.get("price"), minPrice));
      }

      if (maxPrice != null) {
        predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
      }

      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }
}
