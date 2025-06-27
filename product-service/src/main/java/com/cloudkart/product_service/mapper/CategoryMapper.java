package com.cloudkart.product_service.mapper;

import com.cloudkart.product_service.dto.CategoryDto;
import com.cloudkart.product_service.dto.CategoryResDto;
import com.cloudkart.product_service.entity.Category;

public final class CategoryMapper {

  public static CategoryDto toDto(Category category) {

    CategoryDto categoryDto = new CategoryDto();
    categoryDto.setName(category.getName());
    categoryDto.setDescription(category.getDescription());
    categoryDto.setSlug(category.getSlug());
    categoryDto.setImageUrl(category.getImageUrl());
    return categoryDto;

  }

  public static CategoryResDto toResDto(Category category) {
    CategoryResDto categoryResDto = new CategoryResDto();
    categoryResDto.setName(category.getName());
    categoryResDto.setSlug(category.getSlug());
    categoryResDto.setDescription(category.getDescription());
    categoryResDto.setImageUrl(category.getImageUrl());
    return categoryResDto;
  }

  public static void toModel(CategoryDto categoryDto, Category category) {
    category.setName(categoryDto.getName());
    category.setDescription(categoryDto.getDescription());
    category.setImageUrl(categoryDto.getImageUrl());
    category.setSlug(normalizeSlug(categoryDto.getName(), categoryDto.getSlug()));
  }

  private static String normalizeSlug(String name, String customSlug) {
    if (customSlug != null && !customSlug.isBlank()) {
      return toSlug(customSlug);
    }
    return toSlug(name);
  }

  private static String toSlug(String name) {
    return name.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
  }

}
