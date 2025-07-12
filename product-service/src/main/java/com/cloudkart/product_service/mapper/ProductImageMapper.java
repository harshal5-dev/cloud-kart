package com.cloudkart.product_service.mapper;

import com.cloudkart.product_service.dto.ProductImageDto;
import com.cloudkart.product_service.dto.ProductImageResDto;
import com.cloudkart.product_service.entity.ProductImage;

public final class ProductImageMapper {

  public static ProductImageDto toDto(ProductImage productImage) {
    ProductImageDto productImageDto = new ProductImageDto();

    productImageDto.setId(productImage.getId());
    productImageDto.setProductSku(productImage.getProduct().getSku());
    productImageDto.setImageUrl(productImage.getImageUrl());
    productImageDto.setAltText(productImage.getAltText());
    productImageDto.setSortOrder(productImage.getSortOrder());

    return productImageDto;
  }

  public static void toModel(ProductImageDto productImageDto, ProductImage productImage) {

    productImage.setImageUrl(productImageDto.getImageUrl());
    productImage.setAltText(productImageDto.getAltText());
    productImage.setSortOrder(productImageDto.getSortOrder());

  }

  public static ProductImageResDto toResDto(ProductImage productImage) {
    ProductImageResDto productImageResDto = new ProductImageResDto();

    productImageResDto.setImageUrl(productImage.getImageUrl());
    productImageResDto.setAltText(productImage.getAltText());
    productImageResDto.setSortOrder(productImage.getSortOrder());

    return productImageResDto;
  }

}
