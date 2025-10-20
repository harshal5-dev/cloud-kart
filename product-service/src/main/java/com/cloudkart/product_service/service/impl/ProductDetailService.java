package com.cloudkart.product_service.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.cloudkart.product_service.dto.ProductDetailResponseDto;
import com.cloudkart.product_service.dto.ProductReviewDto;
import com.cloudkart.product_service.exception.ResourceNotFoundException;
import com.cloudkart.product_service.mapper.ProductDetailMapper;
import com.cloudkart.product_service.repository.ProductDetailRepository;
import com.cloudkart.product_service.service.IProductDetailService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductDetailService implements IProductDetailService {

  private final ProductDetailRepository productDetailRepository;

  @Override
  public ProductDetailResponseDto getProductDetails(Long productId) {
    // Fetch product basic details
    Object[] productData = productDetailRepository.findProductDetailById(productId)
        .orElseThrow(() -> new ResourceNotFoundException("Product", "ID", productId.toString()));

    // Fetch product images
    List<String> images = productDetailRepository.findProductImages(productId);

    // Fetch product reviews
    List<Object[]> reviewsData = productDetailRepository.findApprovedProductReviews(productId);

    // Map to DTO
    return ProductDetailMapper.mapToProductDetailResponse(productData, images, reviewsData);
  }

  @Override
  public List<ProductReviewDto> getProductReviews(Long productId) {
    List<Object[]> reviewsData = productDetailRepository.findApprovedProductReviews(productId);

    return reviewsData.stream().map(reviewData -> {
      ProductReviewDto review = new ProductReviewDto();
      review.setRating((Integer) reviewData[0]);
      review.setComment((String) reviewData[1]);
      review.setDate((LocalDateTime) reviewData[2]);
      review.setReviewerName((String) reviewData[3]);
      review.setReviewerEmail((String) reviewData[4]);
      return review;
    }).collect(Collectors.toList());
  }

  @Override
  public List<String> getProductImages(Long productId) {
    return productDetailRepository.findProductImages(productId);
  }
}
