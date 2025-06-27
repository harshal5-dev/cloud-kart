package com.cloudkart.product_service.service.impl;

import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import com.cloudkart.product_service.dto.ProductImageDto;
import com.cloudkart.product_service.entity.Product;
import com.cloudkart.product_service.entity.ProductImage;
import com.cloudkart.product_service.exception.ResourceNotFoundException;
import com.cloudkart.product_service.mapper.ProductImageMapper;
import com.cloudkart.product_service.repository.ProductImageRepository;
import com.cloudkart.product_service.service.IProductImageService;
import com.cloudkart.product_service.service.IProductService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductImageService implements IProductImageService {
  private final ProductImageRepository productImageRepository;
  private final IProductService iProductService;


  /**
   * Retrieves a product image by its ID.
   *
   * @param sku the SKU of the product whose image is to be retrieved
   * @return the product image with the specified ID
   */
  @Override
  public List<ProductImageDto> fetchProductImages(String sku) {
    List<ProductImage> productImages = productImageRepository.findByProductSku(sku);
    return productImages.stream().map(ProductImageMapper::toDto).toList();
  }

  /**
   * Creates a new product image.
   *
   * @param sku the SKU of the product to which the image belongs
   * @param productImageDto the product image to create
   * @return the created product image
   */
  @Override
  public ProductImageDto createProductImage(String sku, ProductImageDto productImageDto) {
    Product product = iProductService.fetchProductBySku(sku);

    ProductImage productImage = new ProductImage();
    productImage.setProduct(product);
    ProductImageMapper.toModel(productImageDto, productImage);
    ProductImage savedProductImage = productImageRepository.save(productImage);

    return ProductImageMapper.toDto(savedProductImage);
  }

  /**
   * Updates an existing product image.
   *
   * @param sku the SKU of the product to which the image belongs
   * @param id the ID of the product image to update
   * @param productImageDto the updated product image data
   * @return the updated product image
   */
  @Override
  public ProductImageDto updateProductImage(String sku, UUID id, ProductImageDto productImageDto) {

    Product product = iProductService.fetchProductBySku(sku);

    ProductImage productImage = productImageRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("ProductImage", "id", id.toString()));

    productImage.setProduct(product);
    ProductImageMapper.toModel(productImageDto, productImage);
    ProductImage updatedProductImage = productImageRepository.save(productImage);

    return ProductImageMapper.toDto(updatedProductImage);
  }

  /**
   * Deletes a product image by its ID.
   *
   * @param sku the SKU of the product to which the image belongs
   * @param id the ID of the product image to delete
   */
  @Override
  public void deleteProductImage(String sku, UUID id) {
    iProductService.fetchProductBySku(sku);

    ProductImage productImage = productImageRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("ProductImage", "id", id.toString()));

    productImageRepository.deleteById(productImage.getId());

  }
}
