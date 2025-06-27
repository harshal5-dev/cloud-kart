package com.cloudkart.product_service.mapper;

import java.util.UUID;
import com.cloudkart.product_service.dto.ProductDto;
import com.cloudkart.product_service.dto.ProductResDto;
import com.cloudkart.product_service.entity.Product;

public final class ProductMapper {

  private static String generateSku(String title) {
    String prefix = title.replaceAll("[^a-zA-Z0-9]", "").toUpperCase().substring(0,
        Math.min(3, title.length()));
    String random = UUID.randomUUID().toString().substring(0, 5).toUpperCase();
    return prefix + "-" + random;
  }

  private static String normalizeSlug(String title, String sku) {
    if (sku != null && !sku.isBlank()) {
      return sku;
    }
    return generateSku(title);
  }

  public static ProductDto toDto(Product product) {
    ProductDto productDto = new ProductDto();

    productDto.setTitle(product.getTitle());
    productDto.setDescription(product.getDescription());
    productDto.setPrice(product.getPrice());
    productDto.setStock(product.getStock());
    productDto.setCategorySlug(product.getCategory().getSlug());
    productDto.setSku(product.getSku());
    productDto.setBrand(product.getBrand());
    productDto.setFeatured(product.isFeatured());
    productDto.setTotalSales(product.getTotalSales());

    return productDto;
  }

  public static void toModel(ProductDto productDto, Product product) {

    product.setTitle(productDto.getTitle());
    product.setDescription(productDto.getDescription());
    product.setPrice(productDto.getPrice());
    product.setStock(productDto.getStock());
    product.setBrand(productDto.getBrand());
    product.setFeatured(productDto.isFeatured());
    product.setTotalSales(productDto.getTotalSales());
    product.setSku(normalizeSlug(productDto.getTitle(), productDto.getSku()));

  }

  public static ProductResDto toResDto(Product product) {
    ProductResDto productResDto = new ProductResDto();

    productResDto.setTitle(product.getTitle());
    productResDto.setDescription(product.getDescription());
    productResDto.setPrice(product.getPrice());
    productResDto.setStock(product.getStock());
    productResDto.setCategorySlug(product.getCategory().getSlug());
    productResDto.setCategoryName(product.getCategory().getName());
    productResDto.setSku(product.getSku());
    productResDto.setBrand(product.getBrand());
    productResDto.setFeatured(product.isFeatured());
    productResDto.setTotalSales(product.getTotalSales());
    productResDto.setProductImages(
        product.getProductImages().stream().map(ProductImageMapper::toResDto).toList());

    return productResDto;
  }

}
