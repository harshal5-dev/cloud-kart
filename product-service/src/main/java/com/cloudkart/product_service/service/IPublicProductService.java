package com.cloudkart.product_service.service;

import java.util.List;
import org.springframework.data.domain.Page;
import com.cloudkart.product_service.dto.ProductResDto;

public interface IPublicProductService {

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
  Page<ProductResDto> searchProducts(String category, String keyword, String brand, Double minPrice,
      Double maxPrice, int page, int size, String sortBy, String sortDir);


  /**
   * Fetches products for the landing page based on type and limit.
   *
   * @param type the type of products to fetch (e.g., "featured", "new-arrivals")
   * @param limit the maximum number of products to return
   * @return a list of products for the landing page
   */
  List<ProductResDto> getLandingPageProducts(String type, int limit);

}
