package com.cloudkart.product_service.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.cloudkart.product_service.dto.CategoryResDto;
import com.cloudkart.product_service.dto.ProductResDto;
import com.cloudkart.product_service.entity.Category;
import com.cloudkart.product_service.exception.ResourceNotFoundException;
import com.cloudkart.product_service.mapper.CategoryMapper;
import com.cloudkart.product_service.mapper.ProductMapper;
import com.cloudkart.product_service.repository.CategoryRepository;
import com.cloudkart.product_service.service.IPublicCategoryService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PublicCategoryService implements IPublicCategoryService {
  private final CategoryRepository categoryRepository;

  /**
   * Fetches all categories.
   *
   * @return a list of all categories
   */
  @Override
  public List<CategoryResDto> fetchAllCategories() {
    List<Category> categories = categoryRepository.findAll();
    return categories.stream().map(CategoryMapper::toResDto).toList();
  }

  /**
   * Fetches a category by its slug.
   *
   * @param slug the slug of the category to retrieve
   * @return the category details
   */
  @Override
  public CategoryResDto getCategoryBySlug(String slug) {
    Category category = categoryRepository.findBySlug(slug)
        .orElseThrow(() -> new ResourceNotFoundException("Category", "slug", slug));
    return CategoryMapper.toResDto(category);
  }

  /**
   * Fetches products by category slug.
   *
   * @param slug the slug of the category to retrieve
   * @return the products associated with the category
   */
  @Override
  public List<ProductResDto> fetchProductsByCategorySlug(String slug) {
    Category category = categoryRepository.findBySlug(slug)
        .orElseThrow(() -> new ResourceNotFoundException("Category", "slug", slug));

    return category.getProducts().stream().map(ProductMapper::toResDto).toList();
  }
}
