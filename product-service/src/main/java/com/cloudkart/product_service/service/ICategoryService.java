package com.cloudkart.product_service.service;


import java.util.List;
import com.cloudkart.product_service.dto.CategoryDto;
import com.cloudkart.product_service.entity.Category;

public interface ICategoryService {


  /**
   * Counts the total number of categories.
   *
   * @return the count of categories
   */
  long countCategories();

  /**
   * Retrieves all categories.
   *
   * @return a list of all categories
   */
  List<CategoryDto> fetchCategories();

  /**
   * Retrieves a category by its ID.
   *
   * @param slug the slug of the category to retrieve
   * @return the category with the specified slug
   */
  CategoryDto fetchCategory(String slug);


  /**
   * Retrieves a category by its slug.
   *
   * @param slug the slug of the category to retrieve
   * @return the category with the specified slug
   */
  Category fetchCategoryBySlug(String slug);

  /**
   * Creates a new category.
   *
   * @param categoryDto the category to create
   * @return the created category
   */
  CategoryDto createCategory(CategoryDto categoryDto);

  /**
   * Updates an existing category.
   *
   * @param slug the slug of the category to update
   * @param categoryDto the updated category data
   * @return the updated category
   */
  CategoryDto updateCategory(String slug, CategoryDto categoryDto);

  /**
   * Deletes a category by its ID.
   *
   * @param slug the slug of the category to delete
   */
  void deleteCategory(String slug);

  /**
   * Creates sample categories for testing purposes.
   *
   * @param createDataDto the data transfer object containing sample category data
   */
  void createSampleCategories(List<CategoryDto> categories);
}
