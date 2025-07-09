package com.cloudkart.product_service.service;

import java.util.List;
import com.cloudkart.product_service.dto.ProductDto;
import com.cloudkart.product_service.entity.Product;

public interface IProductService {

  /**
   * Counts the total number of products.
   *
   * @return the count of products
   */
  long countProducts();

  /**
   * Retrieves all products.
   *
   * @return a list of all products
   */
  List<ProductDto> fetchProducts();

  /**
   * Retrieves a product by its SKU.
   *
   * @param sku the SKU of the product to retrieve
   * @return the product with the specified SKU
   */
  ProductDto fetchProduct(String sku);


  /**
   * Retrieves a product by its SKU.
   *
   * @param sku the SKU of the product to retrieve
   * @return the product with the specified SKU
   */
  Product fetchProductBySku(String sku);


  /**
   * Creates a new product.
   *
   * @param productDto the product to create
   * @return the created product
   */
  ProductDto createProduct(ProductDto productDto);

  /**
   * Updates an existing product.
   *
   * @param sku the SKU of the product to update
   * @param productDto the updated product data
   * @return the updated product
   */
  ProductDto updateProduct(String sku, ProductDto productDto);

  /**
   * Deletes a product by its SKU.
   *
   * @param sku the SKU of the product to delete
   */
  void deleteProduct(String sku);

  /**
   * Creates sample products based on the provided data.
   *
   * @param createDataDto the data for creating sample products
   */
  void createSampleProducts(List<ProductDto> products);
}
