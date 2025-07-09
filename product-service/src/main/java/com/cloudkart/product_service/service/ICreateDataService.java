package com.cloudkart.product_service.service;

import com.cloudkart.product_service.dto.CreateDataDto;

public interface ICreateDataService {

  /**
   * Creates sample categories, products, and product images based on the provided CreateDataDto.
   *
   * @param createDataDto the data for creating sample categories, products, and product images
   */
  void createCategoriesSampleData(CreateDataDto createDataDto);

  /**
   * Creates sample products based on the provided CreateDataDto.
   *
   * @param createDataDto the data for creating sample products
   */
  void createProductsSampleData(CreateDataDto createDataDto);

  /**
   * Creates sample product images based on the provided CreateDataDto.
   *
   * @param createDataDto the data for creating sample product images
   */
  void createProductImagesSampleData(CreateDataDto createDataDto);
}
