package com.cloudkart.product_service.mapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import com.cloudkart.product_service.dto.ProductDetailResponseDto;
import com.cloudkart.product_service.dto.ProductDimensionsDto;
import com.cloudkart.product_service.dto.ProductReviewDto;

public final class ProductDetailMapper {

  public static ProductDetailResponseDto mapToProductDetailResponse(Object[] productData,
      List<String> images, List<Object[]> reviewsData) {

    ProductDetailResponseDto dto = new ProductDetailResponseDto();

    // Map basic product data
    dto.setId((Long) productData[0]);
    dto.setTitle((String) productData[1]);
    dto.setDescription((String) productData[2]);
    dto.setCategory((String) productData[3]);
    dto.setPrice((Double) productData[4]);
    dto.setDiscountPercentage((Double) productData[5]);
    dto.setRating((Double) productData[6]);
    dto.setStock((Integer) productData[7]);
    dto.setBrand((String) productData[8]);
    dto.setSku((String) productData[9]);
    dto.setWeight((Double) productData[10]);

    // Map dimensions
    ProductDimensionsDto dimensions = new ProductDimensionsDto();
    dimensions.setWidth((Double) productData[11]);
    dimensions.setHeight((Double) productData[12]);
    dimensions.setDepth((Double) productData[13]);
    dto.setDimensions(dimensions);

    dto.setWarrantyInformation((String) productData[14]);
    dto.setShippingInformation((String) productData[15]);
    dto.setAvailabilityStatus((String) productData[16]);
    dto.setReturnPolicy((String) productData[17]);
    dto.setMinimumOrderQuantity((Integer) productData[18]);
    dto.setThumbnail((String) productData[19]);

    // Set images
    dto.setImages(images);

    // Map reviews
    List<ProductReviewDto> reviews = reviewsData.stream().map(reviewData -> {
      ProductReviewDto review = new ProductReviewDto();
      review.setRating((Integer) reviewData[0]);
      review.setComment((String) reviewData[1]);
      review.setDate((LocalDateTime) reviewData[2]);
      review.setReviewerName((String) reviewData[3]);
      review.setReviewerEmail((String) reviewData[4]);
      return review;
    }).collect(Collectors.toList());

    dto.setReviews(reviews);

    return dto;
  }
}
