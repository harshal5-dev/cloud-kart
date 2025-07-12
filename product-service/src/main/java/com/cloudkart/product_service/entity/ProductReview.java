package com.cloudkart.product_service.entity;

import java.time.LocalDateTime;
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
@Table(name = "product_reviews")
public class ProductReview extends BaseModel {

  @Column(name = "rating", nullable = false)
  private int rating;

  @Column(name = "comment", length = 1000)
  private String comment;

  @Column(name = "reviewer_name", nullable = false, length = 100)
  private String reviewerName;

  @Column(name = "reviewer_email", nullable = false, length = 100)
  private String reviewerEmail;

  @Column(name = "review_date", nullable = false)
  private LocalDateTime reviewDate;

  @Column(name = "approved", nullable = false)
  private boolean approved = false;

  @ManyToOne
  @JoinColumn(name = "product_id")
  private Product product;

}
