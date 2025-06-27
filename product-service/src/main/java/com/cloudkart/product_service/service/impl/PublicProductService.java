package com.cloudkart.product_service.service.impl;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import com.cloudkart.product_service.dto.ProductResDto;
import com.cloudkart.product_service.entity.Product;
import com.cloudkart.product_service.mapper.ProductMapper;
import com.cloudkart.product_service.repository.ProductRepository;
import com.cloudkart.product_service.service.IPublicProductService;
import com.cloudkart.product_service.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PublicProductService implements IPublicProductService {

  private final ProductRepository productRepository;

  /**
   * Searches for products based on various criteria.
   *
   * @param category the category of the product
   * @param keyword the keyword to search in product names or descriptions
   * @param brand the brand of the product
   * @param minPrice the minimum price of the product
   * @param maxPrice the maximum price of the product
   * @param page the page number for pagination
   * @param size the size of each page
   * @param sortBy the field to sort by
   * @param sortDir the direction of sorting (asc/desc)
   * @return a paginated list of products matching the search criteria
   */
  @Override
  public Page<ProductResDto> searchProducts(String category, String keyword, String brand,
      Double minPrice, Double maxPrice, int page, int size, String sortBy, String sortDir) {
    Specification<Product> spec =
        ProductSpecification.getProductsByFilters(category, keyword, brand, minPrice, maxPrice);

    Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending()
        : Sort.by(sortBy).ascending();
    Pageable pageable = PageRequest.of(page, size, sort);

    Page<Product> productPage = productRepository.findAll(spec, pageable);
    return productPage.map(ProductMapper::toResDto);
  }

  /**
   * Fetches products for the landing page based on type and limit.
   *
   * @param type the type of products to fetch (e.g., "featured", "new-arrivals")
   * @param limit the maximum number of products to return
   * @return a list of products for the landing page
   */
  @Override
  public List<ProductResDto> getLandingPageProducts(String type, int limit) {
    List<Product> products;

    if ("featured".equalsIgnoreCase(type)) {
      products = productRepository.findTop8ByFeaturedTrueOrderByCreatedAtDesc();
    } else if ("top-selling".equalsIgnoreCase(type)) {
      products = productRepository.findTop8ByOrderByTotalSalesDesc();
    } else {
      products = productRepository.findTop8ByOrderByCreatedAtDesc();
    }

    return products.stream().limit(limit).map(ProductMapper::toResDto).toList();
  }
}
