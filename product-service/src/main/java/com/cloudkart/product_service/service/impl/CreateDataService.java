package com.cloudkart.product_service.service.impl;

import org.springframework.stereotype.Service;
import com.cloudkart.product_service.dto.CreateDataDto;
import com.cloudkart.product_service.service.ICategoryService;
import com.cloudkart.product_service.service.ICreateDataService;
import com.cloudkart.product_service.service.IProductImageService;
import com.cloudkart.product_service.service.IProductService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreateDataService implements ICreateDataService {

  private final ICategoryService categoryService;
  private final IProductService productService;
  private final IProductImageService productImageService;


  /**
   * Creates sample categories, products, and product images based on the provided CreateDataDto.
   *
   * @param createDataDto the data for creating sample categories, products, and product images
   */
  @Override
  public void createCategoriesSampleData(CreateDataDto createDataDto) {
    categoryService.createSampleCategories(createDataDto.getCategories());
  }

  /**
   * Creates sample products based on the provided CreateDataDto.
   *
   * @param createDataDto the data for creating sample products
   */
  @Override
  public void createProductsSampleData(CreateDataDto createDataDto) {
    productService.createSampleProducts(createDataDto.getProducts());
  }

  /**
   * Creates sample product images based on the provided CreateDataDto.
   *
   * @param createDataDto the data for creating sample product images
   */
  @Override
  public void createProductImagesSampleData(CreateDataDto createDataDto) {
    productImageService.createSampleProductImages(createDataDto.getProductImages());
  }
}
