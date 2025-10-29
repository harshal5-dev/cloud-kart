package com.cloudkart.user_auth_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "addresses")
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
