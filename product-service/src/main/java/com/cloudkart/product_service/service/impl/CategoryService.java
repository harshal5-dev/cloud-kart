package com.cloudkart.product_service.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.cloudkart.product_service.dto.CategoryDto;
import com.cloudkart.product_service.entity.Category;
import com.cloudkart.product_service.exception.CategoryAlreadyExists;
import com.cloudkart.product_service.exception.ResourceNotFoundException;
import com.cloudkart.product_service.mapper.CategoryMapper;
import com.cloudkart.product_service.repository.CategoryRepository;
import com.cloudkart.product_service.service.ICategoryService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {

  private final CategoryRepository categoryRepository;


  /**
   * Counts the total number of categories.
   *
   * @return the count of categories
   */
  @Override
  public long countCategories() {
    return categoryRepository.count();
  }

  /**
   * Retrieves all categories.
   *
   * @return a list of all categories
   */
  @Override
  public List<CategoryDto> fetchCategories() {
    List<Category> categories = categoryRepository.findAll();

    return categories.stream().map(CategoryMapper::toDto).toList();
  }


  /**
   * Retrieves a category by its slug.
   *
   * @param slug the slug of the category to retrieve
   * @return the category with the specified slug
   */
  @Override
  public Category fetchCategoryBySlug(String slug) {
    return categoryRepository.findBySlug(slug)
        .orElseThrow(() -> new ResourceNotFoundException("Category", "slug", slug));
  }

  /**
   * Retrieves a category by its ID.
   *
   * @param slug the slug of the category to retrieve
   * @return the category with the specified slug
   */
  @Override
  public CategoryDto fetchCategory(String slug) {
    Category category = fetchCategoryBySlug(slug);
    return CategoryMapper.toDto(category);
  }

  /**
   * Creates a new category.
   *
   * @param categoryDto the category to create
   * @return the created category
   */
  @Override
  public CategoryDto createCategory(CategoryDto categoryDto) {

    if (categoryRepository.findBySlug(categoryDto.getSlug()).isPresent()) {
      throw new CategoryAlreadyExists(
          "Category with slug " + categoryDto.getSlug() + " already exists");
    }

    Category category = new Category();
    CategoryMapper.toModel(categoryDto, category);
    Category createdCategory = categoryRepository.save(category);

    return CategoryMapper.toDto(createdCategory);
  }

  /**
   * Updates an existing category.
   *
   * @param slug the slug of the category to update
   * @param categoryDto the updated category data
   * @return the updated category
   */
  @Override
  public CategoryDto updateCategory(String slug, CategoryDto categoryDto) {
    Optional<Category> categoryOptional = categoryRepository.findBySlug(slug);

    if (categoryOptional.isEmpty()) {
      throw new ResourceNotFoundException("Category", "slug", slug);
    }
    Category category = categoryOptional.get();
    boolean exists =
        categoryRepository.existsBySlugAndIdNot(categoryDto.getSlug(), category.getId());

    if (exists) {
      throw new CategoryAlreadyExists(
          "Category with slug " + categoryDto.getSlug() + " already exists");
    }

    CategoryMapper.toModel(categoryDto, category);
    Category updatedCategory = categoryRepository.save(category);

    return CategoryMapper.toDto(updatedCategory);
  }

  /**
   * Deletes a category by its ID.
   *
   * @param slug the slug of the category to delete
   */
  @Override
  public void deleteCategory(String slug) {
    Category category = categoryRepository.findBySlug(slug)
        .orElseThrow(() -> new ResourceNotFoundException("Category", "slug", slug));

    categoryRepository.deleteById(category.getId());
  }

  @Override
  public void createSampleCategories(List<CategoryDto> categories) {
    for (CategoryDto categoryDto : categories) {
      if (categoryRepository.findBySlug(categoryDto.getSlug()).isEmpty()) {
        Category category = new Category();
        CategoryMapper.toModel(categoryDto, category);
        categoryRepository.save(category);
      }
    }
  }
}
