package com.cloudkart.user_auth_service.entity;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

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


  @Column(name = "password", nullable = false, length = 555)
  private String password;

  @Column(name = "verify_otp", length = 20)
  private String verifyOtp;

  @Column(name = "is_account_verified")
  private Boolean isAccountVerified;

  @Column(name = "verify_otp_expire_at")
  private Long verifyOtpExpireAt;

  @Column(name = "reset_otp")
  private String resetOtp;

  @Column(name = "reset_otp_expire_at")
  private Long resetOtpExpireAt;

  @ElementCollection
  @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
  @Enumerated(EnumType.STRING)
  @Column(name = "role", nullable = false)
  private Set<UserRole> userRoles = new HashSet<>(Set.of(UserRole.USER));


  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JsonIgnore
  private Set<Address> addresses = new LinkedHashSet<>();
}
