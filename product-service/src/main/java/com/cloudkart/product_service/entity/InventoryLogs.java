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
@Table(name = "inventory_logs")
public class InventoryLogs extends BaseModel {

  @Column(name = "change_type", nullable = false)
  private ChangeType changeType;

  @Column(name = "quantity_changed", nullable = false)
  private int quantityChanged;

  @Column(name = "stock_after", nullable = false)
  private int stockAfter;

  @Column(name = "notes", length = 500)
  private String notes;

  @ManyToOne
  @JoinColumn(name = "product_id")
  private Product product;
}
