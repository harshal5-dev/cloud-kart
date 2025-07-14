package com.cloudkart.product_service.entity;


import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "product")
public class Product extends BaseModel {

  // Basic Product Information
  @Column(name = "title", nullable = false, length = 300)
  private String title;

  @Column(name = "description", length = 500)
  private String description;

  @ManyToOne
  @JoinColumn(name = "category_id")
  private Category category;

  @Column(name = "brand", length = 100)
  private String brand;

  // Pricing
  @Column(name = "price", nullable = false)
  private Double price;

  @Column(name = "discount_percentage")
  private Double discountPercentage = 0.0;

  // Product Identifiers
  @Column(name = "sku", nullable = false, unique = true)
  private String sku;

  // Physical Properties
  @Column(name = "weight")
  private Double weight;

  @Column(name = "width")
  private Double width;

  @Column(name = "height")
  private Double height;

  @Column(name = "depth")
  private Double depth;

  // Product Status
  @Column(name = "is_featured")
  private boolean featured = false;

  // Stock & Order Info
  @Column(name = "stock", nullable = false)
  private Integer stock = 0;

  @Column(name = "minimum_order_quantity", nullable = false)
  private Integer minimumOrderQuantity = 1;

  @Column(name = "availability_status", nullable = false)
  @Enumerated(EnumType.STRING)
  private AvailabilityStatus availabilityStatus = AvailabilityStatus.IN_STOCK;

  // Product Policies (Simple text fields)
  @Column(name = "shipping_details", length = 500)
  private String shippingDetails;

  @Column(name = "warranty_details", length = 500)
  private String warrantyDetails;

  @Column(name = "return_policy", length = 500)
  private String returnPolicy;

  // Media
  @Column(name = "thumbnail", length = 1000)
  private String thumbnail;

  // Aggregated Rating Data
  @Column(name = "average_rating")
  private Double averageRating = 0.0;

  @Column(name = "total_reviews")
  private Integer totalReviews = 0;

  // Sales Data
  @Column(name = "total_sales")
  private Integer totalSales = 0;

  // Product Images
  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<ProductImage> productImages = new ArrayList<>();

  // Product Reviews
  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<ProductReview> productReviews = new ArrayList<>();
}
