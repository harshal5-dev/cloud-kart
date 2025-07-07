package com.cloudkart.product_service.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateDataDto {
  private List<CategoryDto> categories;
  private List<ProductDto> products;
  private List<ProductImageDto> productImages;
}
