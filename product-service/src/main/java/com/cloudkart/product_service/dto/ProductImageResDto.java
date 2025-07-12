package com.cloudkart.product_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Schema(name = "Product Image Response", description = "Schema to hold Product Image information")
public class ProductImageResDto {

  @Schema(description = "Product image name in Cloud kart shop",
      example = "apple-iphone-14-pro-max-front.jpg")
  private String imageUrl;

  @Schema(description = "Alternative text for the image, used for accessibility",
      example = "Apple iPhone 14 Pro Max")
  private String altText;

  @Schema(description = "Sort order for the image in the product gallery", example = "0",
      type = "integer", format = "int32")
  private Integer sortOrder = 0;

}
