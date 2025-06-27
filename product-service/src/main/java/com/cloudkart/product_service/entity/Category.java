package com.cloudkart.product_service.entity;


import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "category")
public class Category extends BaseModel {

  @Column(name = "name", nullable = false, unique = true)
  private String name;

  @Column(name = "description", length = 500)
  private String description;

  @Column(name = "image_url", length = 500)
  private String imageUrl;

  @Column(name = "slug", nullable = false, unique = true)
  private String slug;

  @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
  private List<Product> products = new ArrayList<>();

}
