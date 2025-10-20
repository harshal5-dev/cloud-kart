package com.cloudkart.user_service.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "addresses",
    indexes = {@Index(name = "idx_address_user_id", columnList = "user_id"),
        @Index(name = "idx_address_user_default", columnList = "user_id, is_default"),
        @Index(name = "idx_address_user_type", columnList = "user_id, address_type"),
        @Index(name = "idx_address_default", columnList = "is_default")})
@Getter
@Setter
public class Address extends BaseEntity {

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(name = "address_type", nullable = false)
  @Enumerated(EnumType.STRING)
  private AddressType addressType;

  @Column(name = "street_address", nullable = false)
  private String streetAddress;

  @Column(name = "city", nullable = false)
  private String city;

  @Column(nullable = false)
  private String state;

  @Column(name = "postal_code", nullable = false)
  private String postalCode;

  @Column(nullable = false)
  private String country;

  @Column(name = "phone_number")
  private String phoneNumber;

  @Column(name = "is_default")
  private Boolean isDefault = false;

}
