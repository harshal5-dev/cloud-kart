package com.cloudkart.product_service.service;

import java.util.List;
import com.cloudkart.product_service.dto.CategoryResDto;
import com.cloudkart.product_service.dto.ProductResDto;

public interface IPublicCategoryService {

  /**
   * Fetches all categories.
   *
   * @return a list of all categories
   */
  List<CategoryResDto> fetchAllCategories();

  /**
   * Fetches a category by its slug.
   *
   * @param slug the slug of the category to retrieve
   * @return the products associated with the category
   */
  List<ProductResDto> fetchProductsByCategorySlug(String slug);
}
