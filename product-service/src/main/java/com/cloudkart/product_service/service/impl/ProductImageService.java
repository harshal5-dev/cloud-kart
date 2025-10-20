package com.cloudkart.product_service.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.cloudkart.product_service.constants.ProductImageConstants;
import com.cloudkart.product_service.dto.ProductImageDto;
import com.cloudkart.product_service.entity.Product;
import com.cloudkart.product_service.entity.ProductImage;
import com.cloudkart.product_service.exception.MaxImageCountException;
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
    productImages.sort((a, b) -> {
      if (a.getSortOrder() == null && b.getSortOrder() == null)
        return 0;
      if (a.getSortOrder() == null)
        return 1;
      if (b.getSortOrder() == null)
        return -1;
      return a.getSortOrder().compareTo(b.getSortOrder());
    });
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

    long imageCount = productImageRepository.countByProduct_Id(product.getId());

    if (imageCount > ProductImageConstants.MAX_IMAGE_COUNT) {
      throw new MaxImageCountException(ProductImageConstants.MAX_IMAGE_MSS);
    }

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
  public ProductImageDto updateProductImage(String sku, Long id, ProductImageDto productImageDto) {

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
  public void deleteProductImage(String sku, Long id) {
    iProductService.fetchProductBySku(sku);

    ProductImage productImage = productImageRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("ProductImage", "id", id.toString()));

    productImageRepository.deleteById(productImage.getId());

  }

  /**
   * Creates sample product images based on the provided CreateDataDto.
   *
   * @param createDataDto the CreateDataDto containing product image data
   */
  @Override
  public void createSampleProductImages(List<ProductImageDto> productImages) {
    for (ProductImageDto productImageDto : productImages) {
      Product product = iProductService.fetchProductBySku(productImageDto.getProductSku());

      long imageCount = productImageRepository.countByProduct_Id(product.getId());

      if (imageCount > ProductImageConstants.MAX_IMAGE_COUNT) {
        throw new MaxImageCountException(ProductImageConstants.MAX_IMAGE_MSS);
      }

      ProductImage productImage = new ProductImage();
      productImage.setProduct(product);
      ProductImageMapper.toModel(productImageDto, productImage);
      productImageRepository.save(productImage);
    }
  }

}
