package com.cloudkart.product_service.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product_images")
public class ProductImage extends BaseModel {

  @Column(name = "image_url", nullable = false)
  private String imageUrl;

  @Column(name = "alt_text")
  private String altText;

  @Column(name = "sort_order")
  private Integer sortOrder = 0;

  @ManyToOne
  @JoinColumn(name = "product_id")
  private Product product;

}
