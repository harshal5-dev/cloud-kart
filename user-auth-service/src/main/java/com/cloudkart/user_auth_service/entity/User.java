package com.cloudkart.user_auth_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User extends BaseEntity {
  @Column(name = "user_identifier", nullable = false, unique = true)
  private UUID userIdentifier;

  @Column(name = "username", nullable = false, unique = true, length = 55)
  private String username;

  @Column(name = "email", nullable = false, unique = true, length = 105)
  private String email;

  @Column(name = "first_name", nullable = false, length = 55)
  private String firstName;

  @Column(name = "last_name", length = 55)
  private String lastName;

  @Column(name = "phone_number", unique = true, length = 15)
  private String phoneNumber;

  @Column(name = "profile_picture_url")
  private String profilePictureUrl;

  @ElementCollection
  @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
  @Enumerated(EnumType.STRING)
  @Column(name = "role", nullable = false)
  private Set<UserRole> userRoles = new HashSet<>(Set.of(UserRole.USER));


  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JsonIgnore
  private Set<Address> addresses = new LinkedHashSet<>();
}
