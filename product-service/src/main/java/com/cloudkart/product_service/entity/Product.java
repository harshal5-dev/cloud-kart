package com.cloudkart.product_service.entity;


import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

  @Column(name = "title", nullable = false, length = 300)
  private String title;

  @Column(name = "description", length = 500)
  private String description;

  @Column(name = "price", nullable = false)
  private Double price;

  @Column(name = "stock", nullable = false)
  private Integer stock;

  @Column(name = "brand", length = 100)
  private String brand;

  @Column(name = "sku", nullable = false, unique = true)
  private String sku;

  @Column(name = "is_featured")
  private boolean featured = false;

  @Column(name = "total_sales")
  private int totalSales;

  @ManyToOne
  @JoinColumn(name = "category_id")
  private Category category;

  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
  private List<ProductImage> productImages = new ArrayList<>();
}
