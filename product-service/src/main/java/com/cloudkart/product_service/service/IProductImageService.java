package com.cloudkart.product_service.service;


import java.util.List;
import java.util.UUID;
import com.cloudkart.product_service.dto.ProductImageDto;

public interface IProductImageService {

  /**
   * Retrieves a product image by its ID.
   *
   * @param sku the SKU of the product whose image is to be retrieved
   * @return the product image with the specified ID
   */
  List<ProductImageDto> fetchProductImages(String sku);

  /**
   * Creates a new product image.
   *
   * @param sku the SKU of the product to which the image belongs
   * @param productImageDto the product image to create
   * @return the created product image
   */
  ProductImageDto createProductImage(String sku, ProductImageDto productImageDto);

  /**
   * Updates an existing product image.
   *
   * @param sku the SKU of the product to which the image belongs
   * @param id the ID of the product image to update
   * @param productImageDto the updated product image data
   * @return the updated product image
   */
  ProductImageDto updateProductImage(String sku, UUID id, ProductImageDto productImageDto);

  /**
   * Deletes a product image by its ID.
   *
   * @param sku the SKU of the product to which the image belongs
   * @param id the ID of the product image to delete
   */
  void deleteProductImage(String sku, UUID id);

  /**
   * Creates sample product images based on the provided CreateDataDto.
   *
   * @param createDataDto the CreateDataDto containing product image data
   */
  void createSampleProductImages(List<ProductImageDto> productImages);
}
